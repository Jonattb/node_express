import Validator from "validatorjs"
import User from "@/app/models/User"

/**
 * Email available
 */
Validator.registerAsync( "email_available", async function( email, attribute, req, passes ) {
    const userExists = await User.exists( {
        email
    } )

    if( userExists ){
        passes( false, "Email address has already been taken." );
    } else {
        passes();
    }
} );

/**
 * Email exists
 */
Validator.registerAsync( "email_exists", async function( email, attribute, req, passes ) {
    const userExists = await User.exists( {
        email
    } )

    if( userExists ){
        passes();
    } else {
        passes( false, "The email address does not exist." );
    }
} );

export default ( ruleName ) => ( req, res, next ) => {
    if( ruleName ){

        const rules = require( `@/app/requests/${ ruleName }` );

        const validator = new Validator( req.body, rules );

        validator.checkAsync( function(){
            return next()
        }, function(){

            return res.status( 422 ).json( {
                inputs: validator.errors.all(),
                errorCount: validator.errors.errorCount
            } );
        } );
    } else {
        return res.status( 400 ).json( {
            message: "Validator: rule name is missing.",
        } );
    }
}
import JWT from "jsonwebtoken";
import User from "@/app/models/User"
import { JWT_SECRET } from "@/config/auth"

export default ( req, res, next ) => {
	if ( req.headers && req.headers.authorization ) {
		var parts = req.headers.authorization.split( " " );
		let token = parts[1];

		if( parts[ 0 ] === "Bearer" ){

			JWT.verify( token, JWT_SECRET, async ( err, decoded ) => {
				if ( err ){
					res.status( 403 ).json( {
						status: "Forbidden",
						errors: err 
					} );
				} else {
					const user = await User.findOne( {
						_id: decoded.id
					} ).select( "-password" )

					if( user ){
						req.auth = user;
                        return next();	
					}
					else {
						res.status( 404 ).json( {
							status: "User not found",
						} );
					}
					
				}
			} );
		}
		else 
		{
			res.status( 403 ).json( {
				status: "Badly formatted credentials",
			} );
		}
	}
	else 
	{
		res.sendStatus( "403" );
	}
}
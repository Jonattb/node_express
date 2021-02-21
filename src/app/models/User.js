import mongoose, { Schema } from "mongoose"
import shortid from "shortid"
import bcrypt from "bcryptjs"
import { isEmail } from "validator"
import { SALT_WORK_FACTOR } from "@/config/auth"

const UserSchema = new Schema( {
    friendlyId: {
        type: String,
        default: shortid.generate()
    },
	name: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
    },
	email: {
		type: String,
		required: true,
		trim: true,
        lowercase: true,
        unique: true,
		validate: [ isEmail, "Invalid email" ],

	},
	password: {
		type: String,
		required: true
    },
    lastSignIn: {
        type: Date
    },
    isCompany: {
        type: Boolean,
        default: false,
    },
    isInvestor: {
        type: Boolean,
        default: false,
    },
    isEntrepreneurs: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    tags: [ {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    } ],
    refreshToken: {
        type: String,
    }
},
{
    timestamps: true,
} );

UserSchema.pre( "save", function( next ) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if ( !user.isModified( "password" ) ) return next();

    // generate a salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function( err, salt ) {
        if ( err ) return next( err );

        // hash the password using our new salt
        bcrypt.hash( user.password, salt, function( err, hash ) {
            if ( err ) return next( err );
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        } );
    } );
} );

UserSchema.pre( "updateOne", async function( next ){
	const password = this.getUpdate().$set.password;
    if ( !password ) {
        return next();
    }    
	try {
        // generate a salt
        bcrypt.genSalt( SALT_WORK_FACTOR, function( err, salt ) {
            if ( err ) return next( err );

            // hash the password using our new salt
            bcrypt.hash( password, salt, function( err, hash ) {
                if ( err ) return next( err );
                // override the cleartext password with the hashed one
                this.getUpdate().$set.password = hash;
                next();
            } );
        } );
	} catch( e ){
		return next( e );
	}
} )

export default mongoose.model ( "User", UserSchema );
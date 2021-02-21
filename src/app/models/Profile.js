import mongoose, { Schema } from "mongoose"

const ProfileSchema = new Schema( {
    socials:{
        facebook: String,
        twitter: String,
        linkedin: String,
    },
    website: String,
    country: String,
    city: String,
    phoneNumber: String,
    description: String,
    longDescription: String
},
{
    timestamps: true,
} );

export default mongoose.model ( "Profile", ProfileSchema );
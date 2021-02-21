import mongoose, { Schema } from "mongoose"

const TagScheme = new Schema( {
    title: {
        type: String,
        required: true,
    },
    related: [ {
        type: Schema.Types.ObjectId,
        ref: "Tag",
    } ]
},
{
    timestamps: true,
} );

export default mongoose.model ( "Tag", TagScheme );
import mongoose, { Schema } from "mongoose"

const MessageScheme = new Schema( {
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    proposal: {
        type: Schema.Types.ObjectId,
        ref: "Proposal",
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    quotedMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
} );

export default mongoose.model ( "Message", MessageScheme );
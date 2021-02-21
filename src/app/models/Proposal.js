import mongoose, { Schema } from "mongoose"

const ProposalSchema = new Schema( {
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    publicDescription: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [ {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    } ],
    country: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    companyObjective: {
        type: Number,
        required: true
    },
    requestedMoney: {
        type: Number,
        required: true
    },
    participationPercentage: {
        type: Number,
        required: true
    },
    lastYearSales: {
        type: Number,
        required: true
    },
    lastYearEarnings: {
        type: Number,
        required: true
    },
    marginApplied: {
        type: Number,
        required: true,
    },
    attachments: [ {
        type: String
    } ],
    website: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
} );

export default mongoose.model ( "Proposal", ProposalSchema );
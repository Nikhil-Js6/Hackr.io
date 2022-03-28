const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Schema;

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        max: 256,
        required: true,
    },
    url: {
        type: String,
        trim: true,
        max: 256,
        required: true,
    },
    slug: {
        type: String,
        index: true,
        lowercase: true,
    },
    // categories: [{
    //     type: ObjectId, ref: 'Category', required: true
    // }],
    categories: [{
        type: String,
    }],
    type: {
        type: String,
        default: 'Free'
    },
    medium: {
        type: String,
        default: 'Video'
    },
    clicks: {
        type: Number,
        default: 0
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
    }
},
    {timestamps: true, timeseries: true},
);

module.exports = new mongoose.model("Link", linkSchema);
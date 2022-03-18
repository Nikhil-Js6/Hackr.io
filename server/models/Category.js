const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        max: 20,
        required: true,
    },
    slug: {
        type: String,
        index: true,
        unique: true,
        lowercase: true,
    },
    image: {
        url: String,
        key: String,
    },
    content: {
        type: Object,
        max: 2000000,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
},
    {timestamps: true, timeseries: true},
);

module.exports = new mongoose.model("Category", categorySchema);

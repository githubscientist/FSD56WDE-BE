const mongoose = require('mongoose');

// create a schema
const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'freelance'],
        default: 'full-time'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// create a model and export it
module.exports = mongoose.model('Job', JobSchema, 'jobs');
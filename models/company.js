const mongoose = require('mongoose');

// create a schema
const CompanySchema = new mongoose.Schema({
    name: String,
    location: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// create a model and export it
module.exports = mongoose.model('Company', CompanySchema, 'companies');
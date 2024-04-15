// import the mongoose module
const mongoose = require('mongoose');

// import the config module
const config = require('./utils/config');

// console.log the message Connecting to MongoDB
console.log('Connecting to MongoDB...');

// connect to the database
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });
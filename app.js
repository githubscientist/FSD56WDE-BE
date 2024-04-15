// require express
const express = require('express');

// import the user router
const userRouter = require('./routes/userRoutes');

// create an express application
const app = express();

// define the endpoints
app.use('/api/users', userRouter);

// export the app module
module.exports = app;
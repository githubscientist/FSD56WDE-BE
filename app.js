// require express
const express = require('express');

// require cors
const cors = require('cors');

// require cookie parser
const cookieParser = require('cookie-parser');

// require morgan
const morgan = require('morgan');

// import the user router
const userRouter = require('./routes/userRoutes');

// create an express application
const app = express();

// enable all CORS requests
app.use(cors({
    origin: '*', // allow all origins
    credentials: true
}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// use cookie parser
app.use(cookieParser());

// enable the express application to parse JSON
app.use(express.json());

// define the endpoints
app.use('/api/users', userRouter);

// export the app module
module.exports = app;
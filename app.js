// require express
const express = require('express');

// require cors
const cors = require('cors');

// require cookie parser
const cookieParser = require('cookie-parser');

// require morgan
const morgan = require('morgan');

// import the routes
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const companyRouter = require('./routes/companyRoutes');

// create an express application
const app = express();

// enable all CORS requests
app.use(cors({
    origin: 'https://fsd56wde-fe.netlify.app/', // allow all origins
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
app.use('/api/companies', companyRouter);
app.use('/api/jobs', jobRouter);

// export the app module
module.exports = app;
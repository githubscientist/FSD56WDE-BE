// import the express router
const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

// define the endpoints
// `POST /api/users/register`: Register a new user
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

// export the router
module.exports = userRouter;
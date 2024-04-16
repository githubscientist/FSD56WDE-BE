// import the express router
const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const auth = require('../middleware/auth');

// define the endpoints
// `POST /api/users/register`: Register a new user
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

userRouter.get('/profile', auth.verifyToken, userController.getUser);
userRouter.put('/profile', auth.verifyToken, userController.updateUser);
userRouter.delete('/profile', auth.verifyToken, userController.deleteUser);

userRouter.get('/logout', auth.verifyToken, userController.logout);

// export the router
module.exports = userRouter;
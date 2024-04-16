const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

// define the controller
const userController = {
    register: async (request, response) => {
        try {
            // get the user inputs from the request body
            const { username, password, name, location } = request.body;

            // check if the user already exists in the database
            const user = await User.findOne({ username });

            // if the user exists, return an error
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // if the user does not exist, create a new user
            const newUser = new User({
                username,
                passwordHash,
                name,
                location
            });

            // save the user to the database
            const savedUser = await newUser.save();

            // return the saved user
            response.status(201).json({
                message: 'User created successfully',
                user: savedUser
            });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    login: async (request, response) => {
        try {
            // get the username and password from the request body
            const { username, password } = request.body;

            // check if the user exists in the database
            const user = await User.findOne({ username });

            // if the user does not exist, return an error
            if (!user) {
                return response.status(400).json({ message: 'User not found' });
            }

            // if the user exists, check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

            // if the password is incorrect, return an error
            if (!isPasswordCorrect) {
                return response.status(400).json({ message: 'Invalid credentials' });
            }

            // if the password is correct, generate a token for the user and return it
            const token = jwt.sign({
                username: user.username,
                id: user._id,
                name: user.name,
            }, config.JWT_SECRET);

            // set a cookie with the token
            response.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                secure: true,
            });

            // return the token
            response.json({ message: 'Login successful', token });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    getUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id from the database
            const user = await User.findById(userId).select('-passwordHash -__v -_id');

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // if the user exists, return the user
            response.json({ message: 'User found', user });
            
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    updateUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // get the user inputs from the request body
            const { name, location } = request.body;

            // find the user by id from the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // update the user if the user exists
            if (name) user.name = name;
            if (location) user.location = location;

            // save the updated user to the database
            const updatedUser = await user.save();

            // return the updated user
            response.json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    deleteUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id from the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // delete the user if the user exists
            await user.remove();

            // return a success message
            response.json({ message: 'User deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    logout: async (request, response) => {
        try {
            // clear the token cookie
            response.clearCookie('token');

            // return a success message
            response.json({ message: 'Logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// Export the controller
module.exports = userController;
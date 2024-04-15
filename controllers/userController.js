// define the controller
const userController = {
    register: async (request, response) => {
        response.send('Register a new user');
    }
}

// Export the controller
module.exports = userController;
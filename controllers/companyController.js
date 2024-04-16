// import the company model
const Company = require('../models/company');

// import the user model
const User = require('../models/user');

// create the company controller
const companyController = {
    createCompany: async (request, response) => {
        try {
            // get the company details from the request body
            const { name, location } = request.body;

            // create a new company
            const newCompany = new Company({
                name,
                location,
                createdBy: request.userId
            });

            // save the company
            await newCompany.save();

            // send a response
            response.status(201).json({ message: 'Company created successfully', company: newCompany });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// export the company controller
module.exports = companyController;
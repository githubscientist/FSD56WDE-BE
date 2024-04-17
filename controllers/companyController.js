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
    },
    getCompanies: async (request, response) => {
        try {
            // get all companies
            const companies = await Company.find();

            // send a response
            response.status(200).json({ companies });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getCompany: async (request, response) => {
        try {
            // get the company id from the request params
            const { companyId } = request.params;

            // find the company by id
            const company = await Company.findById(companyId);

            // send a response
            response.status(200).json({ company });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateCompany: async (request, response) => {
        try {
            // get the company id from the request params
            const { companyId } = request.params;

            // get the company details from the request body
            const { name, location, status } = request.body;

            if (name && location && status) {
                // find the company by id and update
                const updatedCompany = await Company.findByIdAndUpdate(
                    companyId, { name, location, status }, { new: true }
                );
            } else if (name && location) {
                // find the company by id and update
                const updatedCompany = await Company.findByIdAndUpdate(
                    companyId, { name, location }, { new: true }
                );
            } else if (name && status) {
                // find the company by id and update
                const updatedCompany = await Company.findByIdAndUpdate(
                    companyId, { name, status }, { new: true }
                );
            } else if (location && status) {
                // find the company by id and update
                const updatedCompany = await Company.findByIdAndUpdate(
                    companyId, { location, status }, { new: true }
                );
            }

            // send a response
            response.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteCompany: async (request, response) => {
        try {
            // get the company id from the request params
            const { companyId } = request.params;

            // find the company by id and delete
            await Company.findByIdAndDelete(companyId);

            // send a response
            response.status(200).json({ message: 'Company deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// export the company controller
module.exports = companyController;
// import the job model
const Job = require('../models/job');

// import the company model
const Company = require('../models/company');

// import the user model
const User = require('../models/user');

// create the job controller
const jobController = {
    createJob: async (request, response) => {
        try {
            // get the job details from the request body
            const { title, description, location, type, company } = request.body;

            // create a new job
            const newJob = new Job({
                title,
                description,
                location,
                type,
                company: company.id,
                createdBy: request.userId
            });

            // save the job
            await newJob.save();

            // send a response
            response.status(201).json({ message: 'Job created successfully', job: newJob });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// export the job controller
module.exports = jobController;
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
    },
    getJobs: async (request, response) => {
        try {
            // get all jobs
            const jobs = await Job.find();

            // send a response
            response.status(200).json({ jobs });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getJob: async (request, response) => {
        try {
            // get the job id from the request params
            const { jobId } = request.params;

            // find the job by id
            const job = await Job.findById(jobId);

            // send a response
            response.status(200).json({ job });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateJob: async (request, response) => {
        try {
            // get the job id from the request params
            const { jobId } = request.params;

            // get the job details from the request body
            const { title, description, location, type, company } = request.body;

            // find the job by id
            const job = await Job.findById(jobId);

            // update the job
            if(title) job.title = title;
            if (description) job.description = description;
            if (location) job.location = location;
            if (type) job.type = type;
            if (company) job.company = company.id;

            // save the job
            await job.save();

            // send a response
            response.status(200).json({ message: 'Job updated successfully', job });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteJob: async (request, response) => {
        try {
            // get the job id from the request params
            const { jobId } = request.params;

            // find the job by id and delete
            await Job.findByIdAndDelete(jobId);

            // send a response
            response.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    applyJob: async (request, response) => {
        try {
            // get the job id from the request params
            const { jobId } = request.params;

            // get the user id from the request
            const userId = request.userId;

            // find the job by id
            const job = await Job.findById(jobId);

            // find the user by id
            const user = await User.findById(userId);

            // check if the user has already applied for the job
            if (job.applicants.includes(userId)) {
                return response.status(400).json({ message: 'You have already applied for this job' });
            }

            // apply for the job
            job.applicants.push(userId);

            // save the job
            await job.save();

            // send a response
            response.status(200).json({ message: 'You have successfully applied for this job', job });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getAppliedJobs: async (request, response) => {
        console.log(request.userId);
        try {
            // get the user id from the request
            const userId = request.userId;

            // get all jobs
            const jobs = await Job.find();

            // filter the jobs where the user has applied
            const appliedJobs = jobs.filter(job => job.applicants.includes(userId));

            // send a response
            response.status(200).json({ jobs: appliedJobs });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// export the job controller
module.exports = jobController;
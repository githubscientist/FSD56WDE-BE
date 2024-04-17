const express = require('express');
const jobRouter = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');
const job = require('../models/job');

// define the routes or endpoints
jobRouter.post('/', auth.verifyToken, auth.isAdmin, jobController.createJob);
jobRouter.get('/', auth.verifyToken, jobController.getJobs);
jobRouter.get('/applied', auth.verifyToken, jobController.getAppliedJobs);
jobRouter.get('/:jobId', auth.verifyToken, jobController.getJob);
jobRouter.put('/:jobId', auth.verifyToken, auth.isAdmin, jobController.updateJob);
jobRouter.delete('/:jobId', auth.verifyToken, auth.isAdmin, jobController.deleteJob);
jobRouter.post('/:jobId/apply', auth.verifyToken, jobController.applyJob);

// export the job router
module.exports = jobRouter;
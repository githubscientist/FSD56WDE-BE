const express = require('express');
const jobRouter = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

// define the routes or endpoints
jobRouter.post('/', auth.verifyToken, jobController.createJob);

// export the job router
module.exports = jobRouter;
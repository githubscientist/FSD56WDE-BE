const express = require('express');
const companyRouter = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');

// define the routes or endpoints
companyRouter.post('/', auth.verifyToken, companyController.createCompany);

// export the company router
module.exports = companyRouter;
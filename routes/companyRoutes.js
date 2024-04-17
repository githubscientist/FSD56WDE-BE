const express = require('express');
const companyRouter = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');

// define the routes or endpoints
companyRouter.post('/', auth.verifyToken, auth.isAdmin, companyController.createCompany);
companyRouter.get('/', auth.verifyToken, auth.isAdmin, companyController.getCompanies);
companyRouter.get('/:companyId', auth.verifyToken, auth.isAdmin, companyController.getCompany);
companyRouter.put('/:companyId', auth.verifyToken, auth.isAdmin, companyController.updateCompany);
companyRouter.delete('/:companyId', auth.verifyToken, auth.isAdmin, companyController.deleteCompany);

// export the company router
module.exports = companyRouter;
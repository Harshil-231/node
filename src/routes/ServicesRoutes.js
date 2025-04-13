const routes = require('express').Router();
const serviceController = require('../controllers/ServicesController');

routes.post('/addservice', serviceController.addService);
routes.get('/getservices', serviceController.getServices); // Existing route, now supports categoryId query parameter
routes.delete('/:id', serviceController.deleteServiceById);
routes.get('/category/:categoryId', serviceController.getServicesByCategoryId); // New route

module.exports = routes;
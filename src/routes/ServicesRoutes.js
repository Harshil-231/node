const routes = require('express').Router();
const serviceController = require('../controllers/ServicesController');

routes.post('/addservice', serviceController.addService);
routes.get('/getservices', serviceController.getServices);
routes.delete('/:id', serviceController.deleteServiceById);

module.exports = routes;

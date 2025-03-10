const routes = require('express').Router();
const salonController = require('../controllers/SalonController');

routes.post('/addsalon', salonController.addSalon);
routes.get('/getsalons', salonController.getSalons);
routes.delete('/:id', salonController.deleteSalonById);

module.exports = routes;

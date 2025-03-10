const routes = require('express').Router();
const ownerController = require('../controllers/OwnerController');

routes.post('/addowner', ownerController.addOwner);
routes.get('/getowners', ownerController.getOwners);
routes.delete('/:id', ownerController.deleteOwnerById);

module.exports = routes;

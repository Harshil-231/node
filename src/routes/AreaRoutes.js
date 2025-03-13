const routes = require('express').Router()
const areaController = require('../controllers/AreaController')
routes.post('/addarea', areaController.addArea)
routes.get('/getareas', areaController.getAreas)
routes.delete("/:id", areaController.deleteAreaById)
routes.get("/getareabycity/:cityId", areaController.getAreaBycityId)
module.exports = routes

const routes = require('express').Router()
const cityController = require('../controllers/CityController')
routes.post("/addcity", cityController.addCity)
routes.get("/getcities", cityController.getCities)
routes.delete("/:id", cityController.deleteCityById)
routes.get("/getcitybystate/:stateId", cityController.getCityByStateId)
module.exports = routes

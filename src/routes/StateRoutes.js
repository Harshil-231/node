const routes = require("express").Router()
const stateController = require("../controllers/StateController")
routes.post("/addstate", stateController.addState)
routes.get("/getstates", stateController.getAllStates)
routes.delete("/:id", stateController.deleteStateById)
module.exports = routes
const routes = require("express").Router()
const userController = require("../controllers/UserController")
const authMiddleware = require("../authMiddleware")


// routes.post("/user",userController.addUser1)
// routes.post("/user", userController.addUser)
routes.post("/login/user", userController.loginUser)
routes.post("/signup", userController.signup)

routes.get("/users", userController.getAllUsers)
routes.delete("/user/:id", userController.deleteUserById)
routes.get("/user/:id", userController.getUserById)


// routes.get("/user/profile", authMiddleware, userController.getUserProfile);


module.exports = routes
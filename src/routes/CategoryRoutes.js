const routes = require("express").Router();
const categoryController = require("../controllers/CategoryController");

routes.get("/getallcategories", categoryController.getAllCategories);
routes.post("/", categoryController.createCategory);
routes.delete("/:id", categoryController.deleteCategory);
routes.get("/:id", categoryController.getCategoryById);

module.exports = routes;
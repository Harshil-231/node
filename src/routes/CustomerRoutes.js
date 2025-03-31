const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

router.post("/add", customerController.createCustomer);
router.get("/get", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
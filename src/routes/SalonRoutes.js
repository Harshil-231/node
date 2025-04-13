// routes/salonRoutes.js
const express = require("express");
const router = express.Router();
const salonController = require("../controllers/SalonController");
const { getSalonById } = require("../controllers/SalonController");
const authMiddleware = require("../authMiddleware");

router.post("/", salonController.createSalon);
router.put("/:salonId", salonController.updateSalon);
router.delete("/:salonId", salonController.deleteSalon);
router.get("/", salonController.getAllSalons);
router.get('/:id', getSalonById);

// Route to get salons by owner ID using authentication middleware
router.get("/owner/:ownerId", authMiddleware, salonController.getSalonsByOwnerId);

module.exports = router;
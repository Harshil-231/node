const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const authMiddleware = require('../authMiddleware'); // Import the middleware


// GET all appointments (for admin only) - requires authentication and admin role
router.get('/', AppointmentController.getAllAppointments);  // Admin access only

// GET appointments for a specific customer
router.get('/customers/:customerId/appointments', authMiddleware, AppointmentController.getCustomerAppointments);
// GET appointments for a specific salon (for salon owners) - Requires Authentication
// GET appointments for salons owned by a specific user - Requires Authentication
router.get('/owner/appointments', authMiddleware, AppointmentController.getSalonAppointments);// POST a new appointment (Customer booking)
router.post(
    '/',
    authMiddleware, // Add the authMiddleware here!
    AppointmentController.createAppointment
);
router.get('/test-user-model', (req, res) => {
    try {
        const User = require('../models/Usermodel');
        console.log("User model:", User); // Check if User is correctly loaded
        res.send("User model loaded successfully.");
    } catch (err) {
        console.error("Error loading User model:", err);
        res.status(500).send("Error loading User model.");
    }
});
// PATCH update an existing appointment (e.g., confirm, cancel) - Needs Authentication
router.patch('/:id', AppointmentController.updateAppointment);

module.exports = router;
// appointment routes
const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const authMiddleware = require('../authMiddleware');

// GET all appointments (for admin only) - requires authentication and admin role
router.get('/getallappointments', authMiddleware, AppointmentController.getAllAppointments);

// GET appointments for a specific customer
router.get('/customers/:customerId/appointments', authMiddleware, AppointmentController.getCustomerAppointments);

// GET appointments for salons owned by the logged-in user (owner)
router.get('/owner/appointments', authMiddleware, AppointmentController.getOwnerAppointments);

// GET appointments for a specific salon
router.get('/salon/:salonId/appointments', authMiddleware, AppointmentController.getAppointmentsBySalon);

// POST a new appointment (Customer booking)
router.post(
    '/',
    authMiddleware, // Add the authMiddleware here!
    AppointmentController.createAppointment
);

// PATCH update an existing appointment (e.g., confirm, cancel) - Needs Authentication
router.patch('/:id', authMiddleware, AppointmentController.updateAppointment);

module.exports = router;
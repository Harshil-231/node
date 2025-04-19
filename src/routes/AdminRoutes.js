const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// Route for getting admin counts
router.get('/admin/counts', adminController.getAdminCounts);
router.get('/admin/owners', adminController.getOwners);
router.get('/admin/salons', adminController.getSalons);
router.get('/admin/customers', adminController.getCustomers);
router.get('/admin/appointments', adminController.getAppointments);

// Define other admin routes here, like creating admins, managing roles/permissions
// router.post('/admin/create', adminController.createAdmin);

module.exports = router;
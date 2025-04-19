// In your appointment controller (AppointmentController.js)

const Salon = require('../models/SalonModel'); // Adjust the path if necessary
const mongoose = require('mongoose');
const Appointment = require('../models/Appointmentmodel');
const User = require('../models/Usermodel');   //  <-- Add this line

// GET all appointments (Admin Only)
// In your appointment controller (AppointmentController.js)
exports.getAllAppointments = async (req, res) => {
    try {
        // No isAdmin check - all authenticated users can access
        const appointments = await Appointment.find().populate('services').populate('customerId'); // Populate customer and services for more details
        res.json({ success: true, data: appointments });
    } catch (err) {
        console.error("Error getting all appointments:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


// GET appointments for a specific customer
// AppointmentController.js
exports.getCustomerAppointments = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        console.log("getCustomerAppointments: customerId from params:", customerId);
        console.log("getCustomerAppointments: req.userId from middleware:", req.userId);
        // console.log("getCustomerAppointments: req.userRole from middleware:", req.userRole); // Check the role

        // Allow admins to access any customer's appointments
        if (req.userRole !== 'admin' && req.userId !== customerId) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only access your own appointments" });
        }

        const appointments = await Appointment.find({ customerId: customerId }).populate('services');
        res.json({ success: true, data: appointments });
    } catch (err) {
        console.error("Error getting customer appointments:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET appointments for salons owned by the logged-in owner
exports.getOwnerAppointments = async (req, res) => {
    try {
        const ownerId = req.userId; // Get owner ID from the authenticated request

        // Find all appointments where the ownerId matches the logged-in owner's ID
        const appointments = await Appointment.find({ ownerId: ownerId })
            .populate('services')
            .populate('customerId', 'username _id');
        res.json({ success: true, data: appointments });
    } catch (err) {
        console.error("Error getting owner's appointments:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAppointmentsBySalon = async (req, res) => {
    const { salonId } = req.params;
    try {
        const appointments = await Appointment.find({ salonId: salonId })
            .populate('services')
            .populate('customerId', 'username _id'); // Populate customer details (specific fields)
        res.json({ success: true, data: appointments });
    } catch (error) {
        console.error("Error fetching appointments by salon:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
// POST a new appointment
exports.createAppointment = async (req, res) => {
    const { salonId, salonName, services, date, time, totalPrice, ownerId } = req.body; // Include ownerId

    // Basic Validation
    if (!salonId || !salonName || !services || !date || !time || !totalPrice || !ownerId) { // Include ownerId
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!Array.isArray(services)) {
        return res.status(400).json({ success: false, message: "Services must be an array" });
    }
    if (typeof totalPrice !== 'number') {
        return res.status(400).json({ success: false, message: "Total price must be a number" });
    }

    try {
        const appointment = new Appointment({
            salonId,
            salonName, // Add salonName
            services,
            date,
            time,
            totalPrice,
            customerId: req.userId, // Use the user ID from the token
            ownerId: ownerId // Save the ownerId
        });

        const newAppointment = await appointment.save();
        res.status(201).json({ success: true, data: newAppointment });
    } catch (err) {
        console.error("Error creating appointment:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

// PATCH update an existing appointment
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Only allow updating of status and notes (adjust as needed)
        if (req.body.status) {
            appointment.status = req.body.status;
        }
        if (req.body.notes) {
            appointment.notes = req.body.notes;
        }

        const updatedAppointment = await appointment.save();
        res.json({ success: true, data: updatedAppointment });
    } catch (err) {
        console.error("Error updating appointment:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};
const Salon = require('../models/SalonModel'); // Adjust the path if necessary
const mongoose = require('mongoose');
const Appointment = require('../models/Appointmentmodel');
const User = require('../models/Usermodel');  //  <-- Add this line

// GET all appointments (Admin Only)
exports.getAllAppointments = async (req, res) => {
    try {
        // Check if the user has admin privileges (example, adjust to your roles setup)
        const user = await Customer.findById(req.userId); // Assuming you have the Customer model available
        if (!user || !user.isAdmin) { // Adjust the isAdmin property to your role property
            return res.status(403).json({ success: false, message: 'Unauthorized: Admin access required' });
        }

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

// GET appointments for a specific salon (for salon owners)
// GET appointments for salons owned by a specific user
exports.getSalonAppointments = async (req, res) => {
    try {
        const ownerId = req.userId;
        console.log("ownerId:", ownerId);  // Log the ownerId

        const salons = await Salon.find({ owner: ownerId });
        console.log("salons:", salons);  // Log the salons

        if (!salons || salons.length === 0) {
            return res.status(404).json({ success: false, message: "No salons found for this owner." });
        }

        const salonIds = salons.map(salon => salon._id);
        console.log("salonIds:", salonIds); // Log the salonIds

        const appointments = await Appointment.find({ salonId: { $in: salonIds } })
            .populate('services')
            .populate('customerId');
        console.log("appointments:", appointments); // Log the appointments

        res.json({ success: true, data: appointments });

    } catch (err) {
        console.error("Error getting salon appointments:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST a new appointment
exports.createAppointment = async (req, res) => {
    const { salonId, salonName, services, date, time, totalPrice } = req.body; // Add salonName

    // Basic Validation
    if (!salonId || !salonName || !services || !date || !time || !totalPrice) {  // Add salonName
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
            customerId: req.userId  // Use the user ID from the token
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
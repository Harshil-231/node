// In your appointment model (Appointmentmodel.js)

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salon',   // Reference to Salon model (if you have one)
        // required: true
    },
    salonName: {
        type: String,
        // required: true
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', // Reference to Service model
        // required: true
    }],
    date: { type: Date, required: true },
    time: { type: String, required: true },   // Store time as a string (e.g., "10:00 AM")
    totalPrice: { type: Number, required: true },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model (for customers)
        required: true
    },
    ownerId: { // Add the ownerId field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming the salon owner is also a User
        required: true,
        select: false // This will prevent the ownerId from being sent in responses by default
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],   // Possible appointment statuses
        default: 'pending'
    },
    notes: { type: String } // Optional notes for the appointment
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

module.exports = mongoose.model('Appointment', AppointmentSchema);
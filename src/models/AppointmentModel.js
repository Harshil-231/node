const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    salonName: {  // Add this field
        type: String,
        // required: true //or false depend on you
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }],
    date: { type: Date, required: true },
    time: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
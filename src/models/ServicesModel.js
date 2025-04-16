const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    salonId: {
        type: Schema.Types.ObjectId,
        ref: "Salon",
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true
    },
    description: {
        type: String
    },
    categoryId: { // ADD THIS FIELD
        type: Schema.Types.ObjectId,
        ref: "category", // Corrected ref value, using lowercase "category" as in your model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
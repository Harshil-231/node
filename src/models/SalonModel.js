// models/SalonModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salonSchema = new Schema({
    salonName: {
        type: String,
        required: true,
        trim: true,
    },
    businessName: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    website: {
        type: String,
        trim: true,
    },
    owner: {  // Add the owner field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner',  // Reference to the Owner model
        required: false
    },
    // serviceType: {  
    //     type: String,
    //     enum: ["male", "female", "unisex"],
    //     default: "unisex" 
    // },
    // price: { 
    //     type: Number,
    //     default: 0  
    // }
}, {
    timestamps: true, 
});

module.exports = mongoose.model("Salon", salonSchema);
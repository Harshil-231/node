const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true
    },
    contact: {
        type: String,
        required: true,
        // unique: true
    },
    status: {
        type: Number,
        default: 1  // 1: Active, 2: Disabled
    }
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);

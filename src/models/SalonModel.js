const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    contact: {
        type: String,
        required: true,
        // unique: true
    },
    // servicesOffered: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Service"
    // }],
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Salon', salonSchema);

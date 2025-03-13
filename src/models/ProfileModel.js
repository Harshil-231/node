const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    contact: {
        type: Number
    },
    experience: {
        type: String
    },
    Gender: {
        enum: ['Male', 'Female'],
        type: String,
        required: true
    },
    Interest_Status: {
        type: Boolean,
        required: true,
        default: true
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    areaId: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
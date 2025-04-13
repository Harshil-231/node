// CustomerModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    contact: { type: Number },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        // required: true,
    },
    experience: { type: String },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
    status: { type: Boolean },
    email: { type: String, required: true, e: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    address: { type: String },
    preferredServices: [{ type: String }],
    profilePicture: { type: String }, // Add this line
    // ... other customer specific fields
}, { timestamps: true }); //added timestamp

module.exports = mongoose.model("customer", userSchema);
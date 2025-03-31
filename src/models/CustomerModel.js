// CustomerModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    contact: { type: Number },
    experience: { type: String },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
    status: { type: Boolean },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    address: { type: String },
    preferredServices: [{ type: String }],
    // ... other customer specific fields
});

module.exports = mongoose.model("customer", userSchema);
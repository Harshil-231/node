// OwnerModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    contact: { type: Number },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
    status: { type: Boolean },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessLicense: { type: String },
    profileImage: { type: String },
    description: { type: String },
    servicesOffered: [{ type: String }],
    // ... other salon owner specific fields
});

module.exports = mongoose.model("owner", userSchema);    
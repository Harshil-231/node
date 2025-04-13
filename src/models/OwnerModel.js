// OwnerModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    contact: { type: Number },
    dateOfBirth: { type: Date },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        // required: true,
    },
    homeAddress: { type: String },
    workAddress: { type: String },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
    status: { type: Boolean },
    email: { type: String, required: true },
    password: { type: String, required: true },
    businessLicense: { type: String },
    description: { type: String },
    profilePicture: { type: String }, // Add this line
    // servicesOffered: [{ type: String }],
    // ... other salon owner specific fields
});

module.exports = mongoose.model("owner", userSchema);
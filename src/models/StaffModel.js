// StaffModel.js
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
    salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles"
    },
    specializations: [{ type: String }],
    profileImage: { type: String },
    // ... other staff specific fields
});

module.exports = mongoose.model("staff", userSchema);
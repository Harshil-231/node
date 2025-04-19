// models/AdminModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const adminSchema = new Schema({
  firstName: { type: String,  },
  lastName: { type: String,  },
  contact: { type: Number },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  // ... other admin-specific fields ...
});

module.exports = mongoose.model("Admin", adminSchema);


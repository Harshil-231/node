const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName: {
        type: String
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
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles"
    },
    status: {
        type: Boolean
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    username: { type: String, required: true, unique: true },
})


module.exports = mongoose.model("User", userSchema)
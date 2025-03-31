const StaffModel = require("../models/StaffModel");

const createStaff = async (req, res) => {
    try {
        const staff = await StaffModel.create(req.body);
        res.status(201).json({ message: "Staff created", data: staff });
    } catch (err) {
        res.status(500).json({ message: "Error creating staff", error: err });
    }
};

const getAllStaff = async (req, res) => {
    try {
        const staff = await StaffModel.find().populate('salonId');
        res.status(200).json({ message: "Staff fetched", data: staff });
    } catch (err) {
        res.status(500).json({ message: "Error fetching staff", error: err });
    }
};

const getStaffById = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id).populate('salonId');
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff fetched", data: staff });
    } catch (err) {
        res.status(500).json({ message: "Error fetching staff", error: err });
    }
};

const updateStaff = async (req, res) => {
    try {
        const staff = await StaffModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('salonId');
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff updated", data: staff });
    } catch (err) {
        res.status(500).json({ message: "Error updating staff", error: err });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const staff = await StaffModel.findByIdAndDelete(req.params.id).populate('salonId');
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff deleted", data: staff });
    } catch (err) {
        res.status(500).json({ message: "Error deleting staff", error: err });
    }
};

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
};
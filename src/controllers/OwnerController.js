const OwnerModel = require("../models/OwnerModel");

const createOwner = async (req, res) => {
    try {
        const Owner = await OwnerModel.create(req.body);
        res.status(201).json({ message: "Salon owner created", data: Owner });
    } catch (err) {
        res.status(500).json({ message: "Error creating salon owner", error: err });
    }
};

const getAllOwners = async (req, res) => {
    try {
        const Owners = await OwnerModel.find();
        res.status(200).json({ message: "Salon owners fetched", data: Owners });
    } catch (err) {
        res.status(500).json({ message: "Error fetching salon owners", error: err });
    }
};

const getOwnerById = async (req, res) => {
    try {
        const Owner = await OwnerModel.findById(req.params.id);
        if (!Owner) {
            return res.status(404).json({ message: "Salon owner not found" });
        }
        res.status(200).json({ message: "Salon owner fetched", data: Owner });
    } catch (err) {
        res.status(500).json({ message: "Error fetching salon owner", error: err });
    }
};

const updateOwner = async (req, res) => {
    try {
        const Owner = await OwnerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!Owner) {
            return res.status(404).json({ message: "Salon owner not found" });
        }
        res.status(200).json({ message: "Salon owner updated", data: Owner });
    } catch (err) {
        res.status(500).json({ message: "Error updating salon owner", error: err });
    }
};

const deleteOwner = async (req, res) => {
    try {
        const Owner = await OwnerModel.findByIdAndDelete(req.params.id);
        if (!Owner) {
            return res.status(404).json({ message: "Salon owner not found" });
        }
        res.status(200).json({ message: "Salon owner deleted", data: Owner });
    } catch (err) {
        res.status(500).json({ message: "Error deleting salon owner", error: err });
    }
};

module.exports = {
    createOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,
};
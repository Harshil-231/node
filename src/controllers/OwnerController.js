const mongoose = require("mongoose");
const OwnerModel = require("../models/OwnerModel");
const Salon = require("../models/SalonModel");

const { uploadFileToCloudinary } = require("../utils/CloudinaryUtil");

const createOwner = async (req, res) => {
    try {
        const newOwner = await OwnerModel.create(req.body);
        await newOwner.save();
        res.status(201).json({ message: "Salon owner created", data: newOwner });
    } catch (err) {
        console.error("Create Owner Error:", err);
        res.status(500).json({ message: "Error creating salon owner", error: err.message });
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
        console.log("Update Payload:", req.body);
        console.log("File received:", req.file); // Log the file object

        let updatedOwnerData = { ...req.body }; // Copy req.body to avoid modifying it directly

        if (req.file) {
            const cloudinaryResponse = await uploadFileToCloudinary(req.file);
            updatedOwnerData.profilePicture = cloudinaryResponse.secure_url; // Store the Cloudinary URL
        }

        const updatedOwner = await OwnerModel.findByIdAndUpdate(req.params.id, updatedOwnerData, { new: true });

        if (!updatedOwner) {
            return res.status(404).json({ message: "Salon owner not found" });
        }

        // Format the date before sending it to client
        const formattedOwner = {
            ...updatedOwner._doc,
            dateOfBirth: updatedOwner.dateOfBirth?.toLocaleDateString("en-IN") || null,
        };

        res.status(200).json({ message: "Salon owner updated", data: formattedOwner });
    } catch (err) {
        console.error("Error updating owner:", err);
        res.status(500).json({ message: "Error updating salon owner", error: err.message });
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
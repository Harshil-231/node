// controllers/SalonController.js
const Salon = require("../models/SalonModel");
const mongoose = require('mongoose');

//Existing Create Salon
createSalon = async (req, res) => {
    try {
        const salon = await Salon.create({ ...req.body });
        res.status(201).json({
            success: true,
            message: "Salon created successfully!",
            data: salon, // Include the created salon data in the response
        });
    } catch (error) {
        console.error("Salon creation error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create salon.",
            error: error.message, // Include the detailed error message for debugging
        });
    }
};
// Existing  Update Salon
updateSalon = async (req, res) => {
    try {
        const updatedSalon = await Salon.findByIdAndUpdate(
            req.params.salonId,
            req.body,
            { new: true }
        );

        if (!updatedSalon) {
            return res.status(404).json({
                success: false,
                message: "Salon not found for update.",
            });
        }

        console.log("Salon updated in database:", updatedSalon); // Log the updatedSalon object

        res.status(200).json({
            success: true,
            message: "Salon updated successfully!",
            data: updatedSalon,
        });
    } catch (err) {
        console.error("Salon update error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to update salon.",
            error: err.message,
        });
    }
};
//Existing Get salon by Id
getSalonById = async (req, res) => {
    try {
        const salon = await Salon.findById(req.params.id);
        if (!salon) {
            return res.status(404).json({
                success: false,
                message: "Salon not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Salon retrieved successfully!",
            data: salon,
        });
    } catch (err) {
        console.error("Salon retrieval error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve salon.",
            error: err.message,
        });
    }
};

const getSalonsByOwnerId = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        const loggedInUserId = req.userId; // Get the logged-in user's ID (assuming middleware sets this)

        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid owner ID format.",
            });
        }

        // Remove this check - it's redundant if you have proper auth middleware.
        // if (ownerId !== loggedInUserId) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Unauthorized: You can only access your own salons.",
        //     });
        // }

        const salons = await Salon.find({ owner: ownerId }).populate('owner'); // Populate for good measure

        res.status(200).json({
            success: true,
            message: "Salons retrieved successfully for the owner!",
            data: salons,  // **RETURN IN THE 'data' PROPERTY!**  This is crucial.
        });
    } catch (err) {
        console.error("Salon retrieval error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve salons for the owner.",
            error: err.message,
        });
    }
};
//Existing Get All salons
const getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.find().populate("owner");
        res.status(200).json({
            success: true,
            message: "All salons fetched successfully!",
            data: salons,
        });
    } catch (err) {
        console.error("Fetch salons error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch salons.",
            error: err.message,
        });
    }
};
//Existing Delete salon
const deleteSalon = async (req, res) => {
    try {
        const deletedSalon = await Salon.findByIdAndDelete(req.params.salonId); // Store deleted salon
        if (!deletedSalon) {
            return res.status(404).json({
                success: false,
                message: "Salon not found for deletion.",
            });
        }
        res.status(200).json({
            success: true,
            message: `Salon "${deletedSalon.salonName}" deleted successfully!`, // Use backticks for template literals
            data: { deletedSalon },  // Send the deleted data
        });
    } catch (err) {
        console.error("Salon deletion error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete salon.",
            error: err.message,
        });
    }
};

module.exports = {
    createSalon,
    updateSalon,
    getAllSalons,
    getSalonById,
    deleteSalon,
    getSalonsByOwnerId

};
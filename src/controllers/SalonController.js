const Salon = require("../models/SalonModel");

// Add a new salon
const addSalon = async (req, res) => {
    try {
        const newSalon = await Salon.create(req.body);
        res.status(201).json({
            message: "Salon added successfully",
            data: newSalon
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Get all salons
const getSalons = async (req, res) => {
    try {
        const salons = await Salon.find()
        // .populate("ownerId", "firstName ", "lastName")
        // .populate("servicesOffered");

        res.status(200).json({
            message: "All salons",
            data: salons
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Delete a salon by ID
const deleteSalonById = async (req, res) => {
    try {
        const deletedSalon = await Salon.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Salon data removed",
            data: deletedSalon
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { addSalon, getSalons, deleteSalonById };

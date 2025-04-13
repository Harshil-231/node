const serviceModel = require("../models/ServicesModel");
const mongoose = require('mongoose'); // Import mongoose

const addService = async (req, res) => {
    try {
        // Validate categoryId
        if (!mongoose.isValidObjectId(req.body.categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const savedService = await serviceModel.create(req.body);
        res.status(201).json({
            message: "Service added successfully",
            data: savedService
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const getServices = async (req, res) => {
    try {
        let query = {}; // Base query

        // Filter by categoryId if provided
        if (req.query.categoryId) {
            if (!mongoose.isValidObjectId(req.query.categoryId)) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }
            query = { categoryId: req.query.categoryId }; // Add category filter
        }

        const services = await serviceModel.find(query).populate("salonId").populate("categoryId"); // Populate the category
        res.status(200).json({
            message: "All Services",
            data: services
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
// New function to get services by Category id
const getServicesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const services = await serviceModel.find({ categoryId: categoryId })
            .populate("salonId")
            .populate("categoryId");
        res.status(200).json({
            message: "Services by Category ID",
            data: services
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const deleteServiceById = async (req, res) => {
    try {
        const deletedService = await serviceModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Service removed successfully",
            data: deletedService
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addService, getServices, deleteServiceById, getServicesByCategoryId };
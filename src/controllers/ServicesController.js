const serviceModel = require("../models/ServicesModel");

const addService = async (req, res) => {
    try {
        const savedService = await serviceModel.create(req.body);
        res.status(201).json({
            message: "Service added successfully",
            data: savedService
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await serviceModel.find().populate("salonId");
        res.status(200).json({
            message: "All Services",
            data: services
        });
    } catch (err) {
        res.status(500).json({ message: err });
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
        res.status(500).json({ message: err });
    }
};

module.exports = { addService, getServices, deleteServiceById };

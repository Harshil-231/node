const mongoose = require("mongoose");
const Customer = require("../models/CustomerModel");


const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ message: "Customer created", data: customer });
    } catch (err) {
        res.status(500).json({ message: "Error creating customer", error: err });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ message: "Customers fetched", data: customers });
    } catch (err) {
        res.status(500).json({ message: "Error fetching customers", error: err });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate and convert id to ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid customer ID format" });
        }

        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer fetched", data: customer });
    } catch (err) {
        res.status(500).json({ message: "Error fetching customer", error: err.message });
    }
};


const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer updated", data: customer });
    } catch (err) {
        res.status(500).json({ message: "Error updating customer", error: err });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted", data: customer });
    } catch (err) {
        res.status(500).json({ message: "Error deleting customer", error: err });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
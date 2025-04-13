const mongoose = require("mongoose");
const Customer = require("../models/CustomerModel");
const { uploadFileToCloudinary } = require("../utils/CloudinaryUtil");

// async function uploadFileToCloudinary(file) {
//     try {
//         const result = await cloudinaryUtil.uploadToCloudinary(file.path, 'customer_profiles'); // Correct folder
//         return result;
//     } catch (error) {
//         console.error("Cloudinary Upload Error:", error);
//         throw new Error("Failed to upload to Cloudinary"); // Re-throw for handling in the main function
//     }
// }

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
        console.log("Customer Update Payload:", req.body);
        console.log("File received:", req.file);

        // const { id } = req.params;

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ message: "Invalid customer ID format" });
        // }

        let updatedCustomerData = { ...req.body };

        if (req.file) {
            try {
                const cloudinaryResponse = await uploadFileToCloudinary(req.file);  // Upload via Util
                updatedCustomerData.profilePicture = cloudinaryResponse.secure_url;
            } catch (uploadError) {
                return res.status(500).json({ message: "Cloudinary upload failed", error: uploadError.message });
            }
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updatedCustomerData, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        // Format the date before sending it to client
        const formattedCustomer = {
            ...updatedCustomer._doc,
            dateOfBirth: updatedCustomer.dateOfBirth?.toLocaleDateString("en-IN") || null,
        };


        res.status(200).json({ message: "Customer updated", data: formattedCustomer });
    } catch (err) {
        console.error("Error updating customer:", err);
        res.status(500).json({ message: "Error updating customer", error: err.message });
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
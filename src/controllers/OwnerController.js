const ownerModel = require("../models/OwnerModel");

const addOwner = async (req, res) => {
    try {
        const savedOwner = await ownerModel.create(req.body);
        res.status(201).json({
            message: "Owner added successfully",
            data: savedOwner
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getOwners = async (req, res) => {
    try {
        const owners = await ownerModel.find();
        res.status(200).json({
            message: "All Owners",
            data: owners
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteOwnerById = async (req, res) => {
    try {
        const deletedOwner = await ownerModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Owner removed successfully",
            data: deletedOwner
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { addOwner, getOwners, deleteOwnerById };

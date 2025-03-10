const areaModel = require("../models/AreaModel");


const addArea = async (req, res) => {
    try {
        const savedArea = await areaModel.create(req.body)
        res.status(201).json({
            message: "Area added successfully",
            data: savedArea
        })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}


const getAreas = async (req, res) => {
    try {
        const areas = await areaModel.find().populate("cityId").populate("stateId")
        res.status(200).json({
            message: "All Areas",
            data: areas,
        })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const deleteAreaById = async (req, res) => {
    try {
        const deletedarea = await AreaModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Area Data Removed",
            data: deletedarea
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getAreaBycityId = async (req, res) => {
    try {
        const areas = await areaModel.find({ cityId: req.params.cityId });
        res.status(200).json({
            message: "area found",
            data: areas,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
}

module.exports = { addArea, getAreas, deleteAreaById, getAreaBycityId }
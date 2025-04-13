const CategoryModel = require('../models/CategoryModel');
const mongoose = require('mongoose'); 

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required', field: 'name' });

    const existing = await CategoryModel.findOne({ name });
    if (existing) return res.status(409).json({ message: 'Category already exists', field: 'name' });

    const category = await CategoryModel.create({ name });
    res.status(201).json(category);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Failed to create category', error: err.message }); // User-friendly message
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve categories', error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) { // Validate ObjectId
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = await CategoryModel.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve category', error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

     if (!mongoose.isValidObjectId(id)) { // Validate ObjectId
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const deleted = await CategoryModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully', deleted }); // Return deleted item
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
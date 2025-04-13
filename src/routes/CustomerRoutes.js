const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');
const multer = require('multer');
const path = require('path');

// Configure Multer (Local Storage - for testing)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure 'uploads' directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });  // Initialize Multer

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);

// Apply Multer middleware *before* the update controller:
router.put('/:id', upload.single('profilePicture'), customerController.updateCustomer);

router.delete('/:id', customerController.deleteCustomer);


module.exports = router;
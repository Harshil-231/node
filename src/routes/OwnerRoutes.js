// OwnerRoutes.js
const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/OwnerController");
const multer = require('multer'); // Import Multer
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post("/", ownerController.createOwner);
router.get("/", ownerController.getAllOwners);
router.get("/:id", ownerController.getOwnerById);
router.put("/:id", upload.single('profilePicture'), ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);

module.exports = router;
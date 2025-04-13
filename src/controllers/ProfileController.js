// const Profile = require("../models/ProfileModel");
// const multer = require("multer");
// const path = require("path");
// const cloudinaryUtil = require("../utils/CloudinaryUtil");
// const mongoose = require("mongoose");

// // ⚡ Multer Storage Configuration (Temporary Storage Before Upload)
// const storage = multer.diskStorage({
//     destination: "./uploads",
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // e filename
//     },
// });

// const upload = multer({ storage }).single("file");

// // 🎯 1️⃣ Add a New Profile
// const addProfile = async (req, res) => {
//     try {
//         const { userId, fullName, phone, address } = req.body;

//         // Validate userId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const profileExists = await Profile.findOne({ userId });
//         if (profileExists) {
//             return res.status(400).json({ message: "Profile already exists for this user" });
//         }

//         const newProfile = await Profile.create({
//             userId,
//             fullName,
//             phone,
//             address,
//         });

//         res.status(201).json({ message: "Profile created successfully", data: newProfile });
//     } catch (err) {
//         res.status(500).json({ message: "Error adding profile", error: err.message });
//     }
// };

// // 🎯 2️⃣ Get Profile by User ID
// const getProfileByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Validate userId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const profile = await Profile.findOne({ userId }).populate("userId", "email role");
//         if (!profile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }

//         res.status(200).json({ message: "Profile fetched successfully", data: profile });
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching profile", error: err.message });
//     }
// };

// // 🎯 3️⃣ Update Profile
// const updateProfile = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Validate userId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const updatedProfile = await Profile.findOneAndUpdate(
//             { userId },
//             req.body,
//             { new: true }
//         );

//         if (!updatedProfile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }

//         res.status(200).json({ message: "Profile updated successfully", data: updatedProfile });
//     } catch (err) {
//         res.status(500).json({ message: "Error updating profile", error: err.message });
//     }
// };

// // 🎯 4️⃣ Upload Profile Picture to Cloudinary
// const uploadProfilePicture = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(500).json({ message: "File upload error", error: err.message });
//         }

//         try {
//             if (!req.file) {
//                 return res.status(400).json({ message: "No file uploaded" });
//             }

//             // Upload to Cloudinary
//             const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file.path);

//             // Update profile with image URL
//             const updatedProfile = await Profile.findOneAndUpdate(
//                 { userId: req.body.userId },
//                 { profileImage: cloudinaryResponse.secure_url },
//                 { new: true }
//             );

//             if (!updatedProfile) {
//                 return res.status(404).json({ message: "Profile not found" });
//             }

//             res.status(200).json({ message: "Profile image updated", data: updatedProfile });
//         } catch (err) {
//             res.status(500).json({ message: "Error uploading image", error: err.message });
//         }
//     });
// };

// module.exports = {
//     addProfile,
//     getProfileByUserId,
//     updateProfile,
//     uploadProfilePicture,
// };

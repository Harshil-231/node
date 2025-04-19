const Owner = require("../models/OwnerModel");
const Admin = require("../models/AdminModel");
const Customer = require("../models/CustomerModel");
const Staff = require("../models/StaffModel");
const RoleModel = require("../models/RoleModel");  // Corrected import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const mailUtil = require("../utils/MailUtil"); // Import the mail utility
// const mongoose = require("mongoose");

const signup = async (req, res) => {
  // console.log("Signup Request Body:", req.body); 
  const { roleId } = req.body;

  try {
    const role = await RoleModel.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    let newUser;
    switch (role.name) {  // Use role.name for comparison
      case "customer":
        newUser = new Customer(userData);
        break;
      case "owner":
        newUser = new Owner(userData);
        break;
      case "staff":
        newUser = new Staff(userData);
        break;
      case "admin":
        newUser = new Admin(userData);
        break;
      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    await newUser.save();

    try {
      await mailUtil.sendingMail(
        newUser.email,
        "Welcome to Our Salon App!",
        "Thank you for signing up!  We're excited to have you."
      );
      console.log("Welcome email sent to:", newUser.email);
    } catch (mailError) {
      console.error("Error sending welcome email:", mailError);
    }

    res.status(201).json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser;
    let userModel;

    foundUser = await Owner.findOne({ email });
    userModel = Owner;

    if (!foundUser) {
      foundUser = await Customer.findOne({ email });
      userModel = Customer;

      if (!foundUser) {
        foundUser = await Staff.findOne({ email });
        userModel = Staff;

        if (!foundUser) {
          foundUser = await Admin.findOne({ email });  // Corrected: Use Admin
          userModel = Admin; // Corrected: Use Admin
        }
      }
    }

    if (!foundUser) {
      return res.status(404).json({ message: "Invalid credentials" }); // Changed message
      }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Changed message
    }

    const role = await RoleModel.findById(foundUser.roleId);

    if (!role) {
      return res.status(500).json({ message: "Role not found for user" });
    }
    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
      // expiresIn: "24h", // Token expires in 1 hour
    });
    // Send the role name in the response
    res.status(200).json({
      message: "Login success",
      data: foundUser,
      role: role.name,
      token: token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

const addUser = async (req, res) => {
  res.status(400).json({ message: "Use signup function for user creation." });
};

const getAllUsers = async (req, res) => {
  try {
    const Owners = await Owner.find();
    const customers = await Customer.find();
    const staff = await Staff.find();

    const allUsers = [...Owners, ...customers, ...staff];

    res.status(200).json({
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      data: err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    let foundUser;

    // Search for the user in all collections
    foundUser = await Owner.findById(req.params.id);
    if (!foundUser) {
      foundUser = await Customer.findById(req.params.id);
      if (!foundUser) {
        foundUser = await Staff.findById(req.params.id);
      }
    }

    if (foundUser) {
      res.status(200).json({
        message: "User fetched successfully",
        data: foundUser,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
      data: err,
    });
  }
};

const deleteUserById = async (req, res) => {
  // This function needs to search in all collections before deleting
  try {
    let deletedUser;
    deletedUser = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      deletedUser = await Customer.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        deletedUser = await Staff.findByIdAndDelete(req.params.id);
      }
    }
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully", data: deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
};
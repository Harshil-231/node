const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt for:", email); // 🛠 Debugging log

        // Find user by email
        const foundUserFromEmail = await userModel.findOne({ email }).populate('roleId');

        console.log("Found user:", foundUserFromEmail); // 🛠 Debugging log

        // If user doesn't exist, return error
        if (!foundUserFromEmail) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Login success
        res.status(200).json({
            message: "Login successful",
            data: foundUserFromEmail,
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const signup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        req.body.password = hashedPassword

        const createdUser = await userModel.create(req.body)

        res.status(201).json({
            message: "user created successfully",
            data: createdUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error",
            data: err
        })
    }
}



// select * from UserModel

const getAllUsers = async (req, res) => {

    const Users = await userModel.find().populate("roleId", "name")

    res.json({
        message: "Users fetched successfully",
        data: Users
    })

}

const addUser1 = async (req, res) => {
    try {
        const createUser = await userModel.create(req.body)
        res.status(201).json({

            message: "user created successfully",
            data: createUser
        })


    } catch (err) {
        res.status(500).json({

            message: "error",
            data: err
        })
    }

}

const addUser = async (req, res) => {
    const savedUser = await userModel.create(req.body)

    res.json({
        message: "user saved...",
        data: savedUser
    })

}

const deleteUser = async (req, res) => {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id)

    res.json({

        message: "user deleted successfully",
        data: deletedUser
    })

}

const getUserById = async (req, res) => {
    const foundUser = await userModel.findById(req.params.id)
    res.json({
        message: "User fatched...",
        data: foundUser
    }
    )
}


module.exports = {
    getAllUsers, addUser, deleteUser, getUserById, addUser1, loginUser, signup
}

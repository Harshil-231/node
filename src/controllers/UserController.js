const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailUtil = require("../utils/MailUtil")

const loginUser = async (req, res) => {
   
    const email = req.body.email;
    const password = req.body.password;
 
    const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")
    console.log(foundUserFromEmail);
   
    if (foundUserFromEmail != null) {
        
        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
   
        if (isMatch == true) {
            res.status(200).json({
                message: "login success",
                data: foundUserFromEmail,
            });
        } else {
            res.status(404).json({
                message: "invalid cred..",
            });
        }
    } else {
        res.status(404).json({
            message: "Email not found..",
        });
    }
};


const signup = async (req, res) => {

    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createdUser = await userModel.create(req.body);


        await mailUtil.sendingMail(createdUser.email, "welcome to eadvertisement", "this is welcome mail")

        res.status(201).json({
            message: "user created..",
            data: createdUser,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error",
            data: err,
        });
    }
};




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

app.get("/api/user/profile", async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authentication middleware sets `req.user`
        const user = await User.findById(userId).select("-password"); // Fetch user, exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {
    getAllUsers, addUser, deleteUser, getUserById, addUser1, loginUser, signup
}

const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { fullname, email, contact, Dob, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists. You can login.",
                success: false
            });
        }
        const userModel = new UserModel({ fullname, email, contact, Dob, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({
            message: "SignUp Successful Please Login..",
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Problem.",
            success: false,
            error: err.message // Optional for development
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errormsg = "Email or Password is wrong"
        if (!user) {
            return res.status(403).json({
                message: errormsg,
                success: false
            });
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(403)
                .json({ message: errormsg, success: false })
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_SECRECT, {
            expiresIn: "72h"
        }
        )
        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            email,
            fullname: user.fullname
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Problem.",
            success: false,
            error: err.message // Optional for development
        });
    }
};

module.exports = {
    signup,
    login
};

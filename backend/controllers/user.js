const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const user = require("../model/usermodel");

exports.register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        
        if (!firstname || !lastname || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Check if the user is already registered
        const existingEmail = await user.findOne({ email: email });
        
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        // Hash the password
        let hashedPswd;
        try {
            hashedPswd = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        // Save user info in the database
        const newUser = new user({
            firstname, 
            lastname, 
            email, 
            password: hashedPswd,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            data: newUser,
            message: "User signed up successfully.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later.",
        });
    }
};

exports.login = async (req, res) => {
    try {
        // Data fetch
        const { email, password } = req.body;
        
        // Validate email and password fields
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please fill out your Email."
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please fill out your Password."
            });
        }

        // Check if the user is registered
        const loginUser = await user.findOne({ email: email });

        // If not a registered user
        if (!loginUser) {
            return res.status(401).json({
                success: false,
                message: "User is not registered. Please Sign Up first."
            });
        }

        // Verify password & generate a JWT token
        const isPasswordValid = await bcrypt.compare(password, loginUser.password);
        if (isPasswordValid) {
            // Create a payload for the JWT token
            const payload = {
                email: loginUser.email,
                id: loginUser._id,
                firstname: loginUser.firstname,
                lastname: loginUser.lastname,
                image: loginUser.image
            };

            // Generate a JWT token
            const token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: "1h" });

            // Send the token as a cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                loginUser,
                message: "User Logged in Successfully."
            });
        } else {
            // If the password is incorrect
            return res.status(403).json({
                success: false,
                message: "Password is Incorrect."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "User cannot be logged in, Please try again later",
        });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.json({ message: 'Logout successful' });
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require("../model/usermodel");
const nodemailer = require("nodemailer");

exports.forgot = async (req, res) => {
    const { email } = req.body;
    
    try {
        const foundUser = await user.findOne({ email: email });

        console.log(foundUser);

        if (!foundUser) {
            return res.status(404).send({ Status: "User not existed" });
        }

        const token = jwt.sign({ id: foundUser._id }, "Anmol", { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com', 
            auth: {
                user: 'anmolsahu8423@gmail.com',
                pass: 'htvy ryxz voii qisc'
            }
        });

        const mailOptions = {
            from: 'anmolsahu8423@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: `Please reset your password using the following link: http://localhost:3000/reset_password/${foundUser._id}/${token}`, // Plain text body
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send({ Status: "Failed to send email" });
            } else {
                return res.send({ Status: "Success", Message: "Reset link sent to email" });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ Status: "Error", Message: "Internal server error" });
    }
};

exports.reset = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, "Anmol");

        // Fetch the user by ID
        const User = await user.findById(id);

        if (!User) {
            return res.status(404).json({ status: "User not found." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        const updatedUser = await user.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true, runValidators: true } // Ensure updates are validated and returned
        );

        if (!updatedUser) {
            return res.status(400).json({ status: "Failed to update password." });
        }

        // Respond with success
        res.json({ status: "Success" });
    } catch (err) {
        // Handle specific JWT errors
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ status: "Invalid or expired token." });
        }

        // Log and return a generic server error
        console.log(err);
        res.status(500).json({ status: "Internal server error." });
    }
};
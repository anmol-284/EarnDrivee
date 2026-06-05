const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxlength: 50,
        },
        lastname: {
            type: String,
            required: true,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        image: {
            type: String,
        },
        location: { type: String },
        dob: { type: Date },
        Registration: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }],
        Pollution: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pollution' }],
        Insurance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' }],
        listedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bike' }],
        bookedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
)

module.exports = mongoose.model("User", userSchema);
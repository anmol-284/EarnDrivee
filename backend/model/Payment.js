// models/paymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike'},
  razorpay_order_id: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  isPaid: { type: Boolean, default: false },
}, 
{ timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

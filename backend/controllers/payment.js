const Payment = require('../model/Payment');
const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');
const Bike = require('../model/bikemodel');

const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID_RAZORPAY,
    key_secret: process.env.KEY_SECRET_RAZORPAY,
});

// Backend: createOrder function
exports.createOrder = async (req, res) => {

    const { bikeId, amount, currency = 'INR' } = req.body;
    console.log(req.body);
    // Validate amount
    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    // Set options for Razorpay order creation
    const options = {
        amount: Number(amount) * 100, // Convert amount to paisa
        currency,
    };

    try {
        // Create the order using Razorpay instance
        const order = await razorpayInstance.orders.create(options);

        console.log('Created Order:', order);

        // Check if the order ID exists
        if (!order.id) {
            return res.status(500).json({ message: 'Failed to create order with Razorpay' });
        }
        
        // Create a new payment record in your database
        const newPayment = new Payment({
            bikeId,
            razorpay_order_id: order.id,
        });

        // Save the new payment record
        await newPayment.save();

        // Log the bikeId and the payment record for debugging
        console.log('Bike ID:', bikeId);
        console.log('New Payment:', newPayment);

        // Respond with the created order
        res.status(201).json(order);
    }
    catch (error) {
        // Handle errors and send error response
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};


exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Ensure all required parameters are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: 'Required parameters are missing' });
    }

    // Generate the expected signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.KEY_SECRET_RAZORPAY)
        .update(body)
        .digest("hex");

    console.log('Expected Signature:', expectedSignature);
    console.log('Received Signature:', razorpay_signature);

    // Check if the received signature matches the expected signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            // Update payment as paid
            const payment = await Payment.findOneAndUpdate(
                { razorpay_order_id },
                {
            razorpay_payment_id,
            razorpay_signature,
                    isPaid: true,
                },
                { new: true }
            );

            if (payment) {
                await Bike.findByIdAndUpdate(payment.bikeId, { isBooked: true });
            }

            // Return success response
            return res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                reference: razorpay_payment_id
            });

        } catch (error) {
            console.error('Error processing payment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'Payment verification failed',
        });
    }
};

exports.getKey = async (req, res) => {
    res.status(200).json({
        key: process.env.KEY_ID_RAZORPAY,
    })
}
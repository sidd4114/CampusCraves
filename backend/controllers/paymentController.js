require("dotenv").config();
const razorpay = require("./razorpayConfig"); // Import Razorpay instance from razorpayConfig.js
const crypto = require("crypto");

// Create an order
exports.createOrder = async (req, res) => {
  try {
    // Log the received order data
    console.log("📦 Received Order Data:", req.body);

    const { totalAmount } = req.body;

    const options = {
      amount: totalAmount * 100, // Amount in paise (multiply by 100)
      currency: "INR",
      receipt: `order_rcptid_${Math.random().toString(36).substring(2, 9)}`, // Generate a random receipt ID
    };

    const order = await razorpay.orders.create(options);

    // Log the created Razorpay order details
    // console.log("✅ Order Created Successfully:", {
    //   orderId: order.id,
    //   amount: order.amount,
    //   currency: order.currency,
    // });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // Send the Razorpay key ID to the frontend
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    // Log the received payment verification data
    console.log("💳 Received Payment Verification Data:", req.body);

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpaySignature) {
      // Log successful payment verification
      console.log("✅ Payment Verified Successfully:", {
        razorpayOrderId,
        razorpayPaymentId,
      });

      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      // Log failed payment verification
      console.log("❌ Payment Verification Failed:", {
        razorpayOrderId,
        razorpayPaymentId,
        expectedSignature,
        razorpaySignature,
      });

      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("❌ Error verifying Razorpay payment:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};

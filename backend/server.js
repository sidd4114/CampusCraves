const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Import routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

// 🛠️ Add missing order route
app.post("/api/create-order", (req, res) => {
  const { userId, orderType, paymentMethod, cartItems, pickupDate, pickupTime } = req.body;
  console.log("Received Order Data:", req.body);

  if (!userId || !cartItems || Object.keys(cartItems).length === 0) {
    return res.status(400).json({ success: false, message: "Invalid order data" });
  }

  res.json({ success: true, orderId: `order_${Date.now()}` });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

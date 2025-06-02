require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentController = require("./controllers/paymentController");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/api/create-order", paymentController.createOrder);
app.post("/api/verify-payment", paymentController.verifyPayment);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

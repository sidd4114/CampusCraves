const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Import routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

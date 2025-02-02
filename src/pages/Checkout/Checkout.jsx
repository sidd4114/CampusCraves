import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection
import "./Checkout.css"; // Your custom styling

const Checkout = () => {
  const [orderType, setOrderType] = useState("instant"); // Default to Instant Order
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle order submission
  const handleOrderSubmit = () => {
    if (orderType === "instant") {
      // Handle instant order logic here
      alert("Instant order placed successfully!");
      navigate("/order-confirmation"); // Redirect to confirmation page
    } else {
      // Handle pre-order logic here
      alert("Pre-order placed successfully!");
      navigate("/order-confirmation"); // Redirect to confirmation page
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Order Type Section */}
      <div className="order-type">
        <h3>Select Order Type</h3>
        <label>
          <input
            type="radio"
            name="orderType"
            value="instant"
            checked={orderType === "instant"}
            onChange={() => setOrderType("instant")}
          />
          Instant Order
        </label>
        <label>
          <input
            type="radio"
            name="orderType"
            value="preorder"
            checked={orderType === "preorder"}
            onChange={() => setOrderType("preorder")}
          />
          Pre-order
        </label>
      </div>

      {/* Order Summary Section */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Order Type: {orderType === "instant" ? "Instant Order" : "Pre-order"}</p>
      </div>

      {/* Submit Button */}
      <button className="btn-submit" onClick={handleOrderSubmit}>
        Submit Order
      </button>
    </div>
  );
};

export default Checkout;

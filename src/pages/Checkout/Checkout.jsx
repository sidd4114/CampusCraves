// Checkout.js
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext"; // Import the StoreContext
import { placeOrder } from "../../functions/placeorder";
import './Checkout.css';

const Checkout = () => {
  const { user, foodList, cartItems, getTotalCartAmount } = useContext(StoreContext); // Access user from context
  const [orderType, setOrderType] = useState("instant");
  const [paymentMethod, setPaymentMethod] = useState("E-Wallet");
  const [pickupDate, setPickupDate] = useState("");

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (orderType === "preorder" && !pickupDate) {
      alert("Please select a pickup date for preorder!");
      return;
    }

    await placeOrder(user.uid, orderType, paymentMethod, pickupDate);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Display food items from the cart */}
      <div className="cart-summary">
        <h3>Your Cart</h3>
        {Object.keys(cartItems).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {Object.keys(cartItems).map((itemId) => {
              const item = foodList.find((product) => product._id === itemId);
              return (
                <li key={itemId}>
                  {item?.name} x {cartItems[itemId]} - ${item?.price * cartItems[itemId]}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="option-group">
        <label>Order Type:</label>
        <div className="button-group">
          <button
            className={orderType === "instant" ? "selected" : ""}
            onClick={() => handleOrderTypeChange("instant")}
          >
            Instant Order
          </button>
          <button
            className={orderType === "preorder" ? "selected" : ""}
            onClick={() => handleOrderTypeChange("preorder")}
          >
            Preorder
          </button>
        </div>
      </div>

      {/* Pickup Date for Preorder */}
      {orderType === "preorder" && (
        <div className="option-group">
          <label>Pickup Date:</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>
      )}

      <div className="option-group">
        <label>Payment Method:</label>
        <div className="button-group">
          <button
            className={paymentMethod === "E-Wallet" ? "selected" : ""}
            onClick={() => handlePaymentMethodChange("E-Wallet")}
          >
            E-Wallet
          </button>
          <button
            className={paymentMethod === "Razorpay" ? "selected" : ""}
            onClick={() => handlePaymentMethodChange("Razorpay")}
          >
            Razorpay
          </button>
        </div>
      </div>

      <button className="place-order-btn" onClick={handleSubmit}>
        Place Order
      </button>

      <div className="total-amount">
        <h3>Total: ${getTotalCartAmount()}</h3>
      </div>
    </div>
  );
};

export default Checkout;

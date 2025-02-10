import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { placeOrder } from "../../functions/placeorder";
import './Checkout.css';
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, foodList, cartItems, getTotalCartAmount,setCartItems } = useContext(StoreContext);
  const [orderType, setOrderType] = useState("instant");
  const [paymentMethod, setPaymentMethod] = useState("E-Wallet");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("✅ Razorpay script loaded!");
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 2);

  const handleSubmit = async () => {
    console.log("🔥 handleSubmit triggered!"); // Debugging log
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (orderType === "preorder" && (!pickupDate || !pickupTime)) {
      alert("Please select both a pickup date and time for preorder!");
      return;
    }

    console.log("📦 Sending order request:", {
      userId: user.uid,
      orderType,
      paymentMethod,
      cartItems,
      foodList,
      pickupDate,
      pickupTime,
    });

    const response = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        orderType,
        paymentMethod,
        cartItems,
        foodList,
        pickupDate,
        pickupTime,
      }),
    });

    console.log("📡 Response received from API:", response);

    if (!response.ok) {
      console.error("❌ Failed to create order:", response.statusText);
      alert("Failed to create order. Try again.");
      return;
    }

    const orderData = await response.json();
    console.log("✅ Order created successfully:", orderData);

    if (!orderData || !orderData.orderId) {
      alert("Failed to create Razorpay order.");
      return;
    }

    if (paymentMethod === "Razorpay") {
      console.log("💰 Initiating Razorpay payment...");

      const options = {
        key: "rzp_test_zm3VuyFOVpqFZs",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Campus Craves",
        description: "Food Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          console.log("🎉 Payment Successful!", response);
          alert("Payment Successful!");
          await placeOrder(user.uid, orderType, paymentMethod, cartItems, foodList, pickupDate, pickupTime);
          setCartItems({}); // ✅ Clears the cart
          navigate("/thank-you"); // ✅ Redirects to "Thank You" page
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.log("🛒 Placing order without Razorpay...");
      await placeOrder(user.uid, orderType, paymentMethod, cartItems, foodList, pickupDate, pickupTime);
    }
    
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
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
                  {item?.name} x {cartItems[itemId]} - ₹{item?.price * cartItems[itemId]}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="option-group">
        <label>Order Type:</label>
        <div className="button-group">
          <button className={orderType === "instant" ? "selected" : ""} onClick={() => setOrderType("instant")}>
            Instant Order
          </button>
          <button className={orderType === "preorder" ? "selected" : ""} onClick={() => setOrderType("preorder")}>
            Preorder
          </button>
        </div>
      </div>

      {orderType === "preorder" && (
        <>
          <div className="option-group">
            <label>Pickup Date:</label>
            <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} min={today.toISOString().split("T")[0]} max={maxDate.toISOString().split("T")[0]} />
          </div>
          <div className="option-group">
            <label>Pickup Time:</label>
            <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
          </div>
        </>
      )}

      <div className="option-group">
        <label>Payment Method:</label>
        <div className="button-group">
          <button className={paymentMethod === "E-Wallet" ? "selected" : ""} onClick={() => setPaymentMethod("E-Wallet")}>
            E-Wallet
          </button>
          <button className={paymentMethod === "Razorpay" ? "selected" : ""} onClick={() => setPaymentMethod("Razorpay")}>
            Razorpay
          </button>
        </div>
      </div>

      <button className="place-order-btn" onClick={handleSubmit}>Place Order</button>

      <div className="total-amount">
        <h3>Total: ₹{getTotalCartAmount()}</h3>
      </div>
    </div>
  );
};

export default Checkout;

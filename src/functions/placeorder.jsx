import { db } from "../Components/firebase"; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Function to place the order
export async function placeOrder(userId, orderType, paymentMethod, cartItems, foodList, pickupDate = null, pickupTime = null) {
  try {
    // Prepare order data (dynamically get items and prices from cartItems and foodList)
    const orderData = {
      userId,                      // User who placed the order
      items: getSelectedItems(cartItems, foodList),    // Get the items selected by the user from cart and foodList
      totalPrice: calculateTotalPrice(cartItems, foodList), // Calculate total price based on selected items
      status: orderType === "instant" ? "Placed" : "Preordered", // Instant or Preordered
      orderDate: serverTimestamp(),  // Store the timestamp of when the order is placed
      paymentMethod,                // E-Wallet or Razorpay
      paymentStatus: "Pending",     // Initial payment status (you can update this later)
      pickupDate: orderType === "preorder" ? pickupDate : null, // Pickup date for preorders
      pickupTime: orderType === "preorder" ? pickupTime : null, // Pickup time for preorders
    };

    // Save order data to Firestore
    console.log("Order Data: ", orderData);  // Log order data before sending to Firestore

    const docRef = await addDoc(collection(db, "orders"), orderData); // Save the order document
    console.log("Order placed with ID: ", docRef.id); // Log the document ID
    alert("Order placed successfully!"); // Notify the user

    // Optionally, handle redirection or additional logic after order placement

  } catch (error) {
    console.error("Error placing order: ", error); // Log the error
    alert("Failed to place order. Please try again.");
  }
}

// Helper function to calculate the total price dynamically
function calculateTotalPrice(cartItems, foodList) {
  let totalAmount = 0;

  // Loop through cart items and get the corresponding item from foodList to calculate the total
  Object.keys(cartItems).forEach((itemId) => {
    const item = foodList.find((food) => food._id === itemId);
    if (item) {
      totalAmount += item.price * cartItems[itemId]; // Calculate the total price
    }
  });

  return totalAmount;
}

// Helper function to get selected items dynamically from cartItems and foodList
function getSelectedItems(cartItems, foodList) {
  const selectedItems = [];

  // Loop through cart items and get the corresponding item from foodList
  Object.keys(cartItems).forEach((itemId) => {
    const item = foodList.find((food) => food._id === itemId);
    if (item && cartItems[itemId] > 0) {
      selectedItems.push({
        name: item.name,
        price: item.price,
        quantity: cartItems[itemId],
        totalPrice: item.price * cartItems[itemId],
      });
    }
  });

  return selectedItems;
}

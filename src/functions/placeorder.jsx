import { db } from "../Components/firebase"; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Function to place the order
export async function placeOrder(userId, orderType, paymentMethod, pickupDate = null) {
  try {
    // Prepare order data (you can also dynamically get items and prices from user selection)
    const orderData = {
      userId,                      // User who placed the order
      items: getSelectedItems(),    // Get the items selected by the user (you can replace this)
      totalPrice: calculateTotalPrice(), // Calculate total price based on items
      status: orderType === "instant" ? "Placed" : "Preordered", // Instant or Preordered
      orderDate: serverTimestamp(),  // Store the timestamp of when the order is placed
      paymentMethod,                // E-Wallet or Razorpay
      paymentStatus: "Pending",     // Initial payment status (you can update this later)
      pickupDate: orderType === "preorder" ? pickupDate : null, // Pickup date for preorders
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

// Helper function to calculate the total price (you can implement this based on selected items)
function calculateTotalPrice() {
  return 100;  // Replace with dynamic calculation logic based on user selection
}

// Helper function to get selected items (you can implement this based on the user's cart or selection)
function getSelectedItems() {
  return [
    { name: "Item 1", price: 50 },
    { name: "Item 2", price: 50 }
  ];  // Replace with dynamic data (user's selected items)
}

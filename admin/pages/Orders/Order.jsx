import React, { useEffect, useState } from "react";
import { db } from "../../../src/Components/firebase"; // Ensure Firebase is correctly imported
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore
  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersList);
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  // Update order status to "done"
  const markAsDone = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "Done" });
      toast.success("Order marked as done!");
      fetchOrders(); // Refresh orders list
    } catch (error) {
      toast.error("Error updating order: " + error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2>Orders List</h2>
      <div className="orders-table">
        <div className="orders-header">
          <b>Order ID</b>
          <b>Items</b>
          <b>Total Amount</b>
          <b>Status</b>
          <b>Action</b>
        </div>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="orders-row">
              <p>{order.id}</p>
              <p>{order.items?.map((item) => item.name).join(", ")}</p>
              <p>₹{order.totalAmount}</p>
              <p className={order.status === "Done" ? "done" : "pending"}>
                {order.status}
              </p>
              {order.status !== "Done" && (
                <button onClick={() => markAsDone(order.id)} className="done-btn">
                  Mark as Done
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    // Redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Thank You for Your Order! 🎉</h1>
        <p style={styles.subtitle}>Your order has been placed successfully.</p>

        {orderDetails ? (
          <div style={styles.receipt}>
            <h2 style={styles.receiptTitle}>🧾 Order Receipt</h2>
            <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p><strong>Payment ID:</strong> {orderDetails.paymentId}</p>
            <p><strong>Amount Paid:</strong> ₹{orderDetails.amount / 100}</p>
            <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
            <p><strong>Status:</strong> ✅ Successful</p>
          </div>
        ) : (
          <p style={styles.errorText}>No order details found.</p>
        )}

        <button style={styles.button} onClick={() => navigate("/")}>
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  title: {
    fontSize: "24px",
    color: "#28a745",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6c757d",
    marginBottom: "20px",
  },
  receipt: {
    backgroundColor: "#f1f1f1",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "left",
    marginBottom: "20px",
  },
  receiptTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  errorText: {
    color: "red",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ThankYou;

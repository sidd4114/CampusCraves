import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Components/firebase"; // Adjust the path to firebase.js as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SignInwithGoogle from "../Components/SignInwithGoogle"; // Adjust path to the Google sign-in component
import { sendPasswordResetEmail } from "firebase/auth"; // Import password reset method

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // State to toggle forgot password mode
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
        autoClose:"5000",
      });
      navigate("/home"); // Redirect to Home page after login
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.", {
        position: "top-center",
      });
      setForgotPasswordMode(false); // Close forgot password mode after success
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      {!forgotPasswordMode ? (
        <form onSubmit={handleSubmit}>
          <h3>Login to your account</h3>
          <br />

          <div className="mb-3"> {/* bootstrap */ }
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label className="label mb-0">Password</label>
              <a
                href="#"
                onClick={() => setForgotPasswordMode(true)}
                className="forgot-password"
                style={{ fontSize: "0.9rem", textDecoration: "none" }}
              >
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            New user? <a href="/signup">Register Here</a>
          </p>
          <SignInwithGoogle />
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <h3 style={{
        marginBottom:'-5px'
        }}>Oops! Forgot your password?</h3>

        <h4 style={{
        fontSize: '16px',
        color: '#555',
        fontWeight: 'normal',
        opacity: '0.8',
        display:'flex',
        justifyContent:'center',
        marginBottom:'20px'
        }}>
        Reset Password
        </h4>
      
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email to reset password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Send Password Reset Email
            </button>
          </div>
          <p className="forgot-password text-right">
            Remembered your password?{" "}
            <a href="#" onClick={() => setForgotPasswordMode(false)}>
              Login here
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;

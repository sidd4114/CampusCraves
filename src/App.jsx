import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Homepage/Home";
import Menu from "./pages/Menu/Menu"; // Import Menu component
import Navbar from "./Components/navbar/Navbar"; // Import the Navbar
import Ewallet from "./pages/Ewallet/Ewallet";
import { auth } from "./Components/firebase"; // Import Firebase auth
import { useEffect, useState } from "react";
import { firebaseSignOut } from "./Components/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from "./pages/Cart/Cart";

import Preorder from "./pages/Preorder/Preorder";
import Checkout from "./pages/Checkout/Checkout";
import ThankYou from "./pages/ThankYou/ThankYou";
import YourOrder from "./pages/YourOrder/YourOrder";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state to control render until user state is checked
  const location = useLocation(); // To get the current location/path

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log("User logged in:", currentUser); // Log user details
        
    } 
      setUser(currentUser); // Set the user state to the current logged-in user (or null if not logged in)
      setLoading(false); // Once the state is set, stop showing loading
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner while checking auth state
  }

  // Determine if we're on the login or signup page to hide the navbar
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth); // Sign out the user from Firebase
      setUser(null); // Update user state to null
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      {/* Show Navbar on all pages except /login and /signup */}
      {!isAuthPage && <Navbar user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

         {/* Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/preorder" element={<Preorder/>} />
        <Route path="/cart" element={<Cart/> } />
        <Route path="/Ewallet" element={<Ewallet/> } />
        <Route path="/checkout" element={<Checkout/> } />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/YourOrder" element={<YourOrder userId={user?.uid} />}/>


      </Routes>
      
      
      
    </>
  );
}

export default App;

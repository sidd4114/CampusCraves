import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Homepage/Home";
import { auth } from "./Components/firebase";
import { useEffect, useState } from "react";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // To get the current location/path

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Determine if we're on the login or signup page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"; 

  return (
    <>
    {/*<ToastContainer />*/}
    <div className="App">
      <div className="auth-wrapper">
        {/* Apply 'auth-inner' only for /login and /signup pages */}
        <div className={isAuthPage ? "auth-inner" : ""}>
          <Routes>
            {/* Redirect root to /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Route */}
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
          
        </div>
      </div>
    </div>
    </>
  );
}


export default App;
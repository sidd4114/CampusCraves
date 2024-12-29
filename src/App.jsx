import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Homepage/Home";
import Menu from "./pages/Menu/Menu"; // Import Menu component
//import Preorder from "./pages/Preorder"; // Import Preorder component
//import ListItem2 from "./pages/ListItem2"; // Import ListItem2 component
import Navbar from "./Components/navbar/Navbar"; // Import the Navbar
import { auth } from "./Components/firebase";
import { useEffect, useState } from "react";

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
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" ;

  return (
    <>
      {/* <ToastContainer /> */}
      {/* <div className="App"> */}
        {/* Show Navbar on all pages except /login and /signup */}
      {!isAuthPage && <Navbar />}
            <Routes>
              {/* Redirect root to /login */}
              <Route path="/" element={<Navigate to="/login" />} />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />}/>

              
              


              {/* Private Routes */}
              <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/menu" element={user ? <Menu /> : <Navigate to="/login" />} />


              {/*<Route path="/preorder" element={user ? <Preorder /> : <Navigate to="/login" />} />
              <Route path="/listitem2" element={user ? <ListItem2 /> : <Navigate to="/login" />} />
              */}
              
              </Routes>

      {/* </div> */}
    </>
  );
}

export default App;

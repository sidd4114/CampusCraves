import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './Navbar.css';
import { toast } from 'react-toastify'; // Import toast
import YourOrder from '../../pages/YourOrder/YourOrder';

const Navbar = ({ onLogout, user }) => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate(); // Initialize navigate function
    const location = useLocation(); // Get the current location

    // Update the menu state when the location changes (on page refresh or route change)
    useEffect(() => {
        const currentPage = location.pathname.split("/")[1]; // Get the current route path after the '/'
        setMenu(currentPage); // Set the active menu item
    }, [location]); // This effect runs whenever the location changes

    // Function to handle menu click and navigate
    const handleMenuClick = (page) => {
        setMenu(page); // Update the active menu state
        navigate(`/${page}`); // Navigate to the corresponding page
    };

    const handleAuthAction = () => {
        if (user) {
            onLogout(); // Logs out the user
            // Show toast when user logs out
            toast.success("You have logged out successfully!", {
                position: "top-center",
                autoClose: 5000, // Adjust the autoClose time as needed
            });
        } else {
            navigate("/login"); // Redirects to the login page if not logged in
        }
    };

    return (
        <div className='navbar'>
            <h2>CampusCraves.</h2>
            <ul className="navbar-menu">
                <li
                    onClick={() => handleMenuClick("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    Home
                </li>
                <li
                    onClick={() => handleMenuClick("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </li>
                <li
                    onClick={() => handleMenuClick("preorder")}
                    className={menu === "preorder" ? "active" : ""}
                >
                    Preorder
                </li>
                <li
                    onClick={() => handleMenuClick("Ewallet")}
                    className={menu === "Ewallet" ? "active" : ""}
                >
                    eWallet
                </li>
                <li
                    onClick={() => handleMenuClick("YourOrder")}
                    className={menu === "YourOrder" ? "active" : ""}
                    
                >
                    YourOrder
                </li>
            </ul>
            <div className="navbar-right">
                <img src='./icons/search.png' className='icon' alt="search icon" />
                <div className="navbar-basket-icon"></div>
                <img src="./icons/shopping-cart.png" className='icon' onClick={()=>navigate("/cart")} alt="cart icon" />
                <div className='dot'></div>
                <button className="Logout" onClick={handleAuthAction}>
                    {user ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
};

export default Navbar;

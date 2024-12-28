import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle menu click and navigate
    const handleMenuClick = (page) => {
        setMenu(page); // Update the active menu state
        navigate(`/${page}`); // Navigate to the corresponding page
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
                    onClick={() => handleMenuClick("listitem2")}
                    className={menu === "listitem2" ? "active" : ""}
                >
                    ListItem2
                </li>
            </ul>
            <div className="navbar-right">
                <img src='../public/icons/search.png' className='icon' alt="search icon" />
                <div className="navbar-basket-icon"></div>
                <img src="../public/icons/shopping-cart.png" className='icon' alt="cart icon" />
                <div className='dot'></div>
            </div>
        </div>
    );
};

export default Navbar;

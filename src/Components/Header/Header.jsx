import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';


const Header = () => {
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle button click and navigate to menu page
    const goToMenu = () => {
        navigate("/menu"); // Navigate to /menu page
    };
    return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p> Elevate your dining experience with a diverse menu crafted from the finest ingredients and culinary expertise. Streamline orders, skip the queues, and savor convenience with every bite. </p>
            <button onClick={goToMenu}>Menu</button>
        </div>
    </div>
    )
}

export default Header

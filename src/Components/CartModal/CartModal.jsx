import React from 'react';
import './CartModal.css';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
  const navigate=useNavigate();

  const handlelogin=()=>{
    navigate('/login');

  };

  const handlelogout=()=>{
    navigate('/menu');
  };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Please log in to proceed</h2>
                <p>You need to be logged in to complete your order.</p>
                <div className="modals-buttons">
                <button onClick={handlelogin} className="modal-button login-button">Log In</button>
                <button onClick={handlelogout} className="modal-button no-thanks-button">No, Thanks!</button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;

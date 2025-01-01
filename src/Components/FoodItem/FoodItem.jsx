import React from 'react';
import './FoodItem.css';

const FoodItem = ({ id, name, price, description, image }) => {
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className='food-item-image' src={image} alt={name} />
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <h3>{name}</h3>
                {/* You can add stars or ratings here if you want */}
            </div>

            <p className="food-item-desc">{description}</p>

            <div className="food-item-footer">
                <p className="food-item-price">₹{price}</p>
            </div>
        </div>
    </div>
  );
}

export default FoodItem;

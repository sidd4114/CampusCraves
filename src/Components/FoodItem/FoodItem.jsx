import React, { useState } from 'react';
import './FoodItem.css';

const FoodItem = ({ id, name, price, description, image }) => {

        const[itemCount,setItemCount]=useState(0)

        return (
            <div className='food-item'>
                <div className="food-item-image-container">
                    <img className='food-item-image' src={image} alt={name} />
                    { !itemCount?
                    
                    (
                        <img 
                            className="add-to-cart-icon" 
                            onClick={()=>setItemCount(prev=>prev+1)}
                            src='/icons/addingtocart.png'
                            alt='Add to cart' />
                    )
                            :
                            <div className='food-item-counter'>
                                <img onClick={()=>setItemCount(prev=>prev-1)} src='./icons/cross1.png'></img>
                                <p>{itemCount}</p>
                                <img onClick={()=>{console.log("Increasing item count");setItemCount(prev=>prev+1)}} src='./icons/add1.png'></img>
                            </div>

                            
                    }
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

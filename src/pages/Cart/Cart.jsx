import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import Footer from '../../Components/Footer/Footer'
import CartModal from '../../Components/CartModal/CartModal'
const Cart = () => {

  const {cartItems,food_list,removeFromCart}=useContext(StoreContext);  


  return (
    <>
    <div className='cart'>
        <div className="cart-items">
            <div className="cart-items-title">

            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>

            </div>
            <br/>
            <hr/>
            {food_list.map((item,index)=>{
                if(cartItems[item._id]>0){
                    return(
                        <div className="cart-items-title cart-items-item">
                            <img src={item.image}></img>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>₹{item.price*cartItems[item._id]}</p>
                            <p>X</p>
                        </div>
                    )
                }

            })}
        </div>
        
    </div>
    <CartModal/>
    <Footer/>
    </>
  )
}

export default Cart

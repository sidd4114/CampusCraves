import { createContext, useEffect } from "react";
import { food_list } from "../assets/menu_imgs";
import { useState } from "react";
import { auth } from "../Components/firebase";
import { onAuthStateChanged } from "firebase/auth";


export const StoreContext=createContext(null)



const StoreContextProvider=(props)=>{

    const[cartItems,setCartItems]=useState({});
    const [user, setUser] = useState(null);  // New user state
    
    const addToCart=(itemId)=>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){

            if(cartItems[item]>0){
            let itemInfo=food_list.find((product)=>product._id===item)
            totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }


    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
  
            setUser(currentUser);  // Set user when logged in
          } else {
            setUser(null);  // Set user to null when logged out
          }
        });

    
        return () => unsubscribe();  // Cleanup the listener when component unmounts
      }, []);




    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        user,
        getTotalCartAmount

    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
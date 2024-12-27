import React, { useState } from 'react'
import './Navbar.css'

//this is a function
const Navbar = () => {
    const[menu,setMenu]=useState("home");




    return (
    <div className='navbar'>
        <h2>CampusCraves.</h2>
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setMenu("listitem")} className={menu==="listitem"?"active":""}>preorder</li>
            <li onClick={()=>setMenu("listitem2")} className={menu==="listitem2"?"active":""}>listitem2</li>
        </ul>
    <div className="navbar-right">
        <img src='../public/icons/search.png' className='icon' ></img>
        <div className="navbar-basket-icon"></div>
        <img src="../icons/shopping-cart.png" className='icon' alt="" />
        <div className='dot'></div>
        
    </div>

    </div>
    )
}

export default Navbar

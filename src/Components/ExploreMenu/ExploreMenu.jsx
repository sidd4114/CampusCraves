import React from 'react'
import { menu_list } from '../../assets/menu_imgs'

import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu">
      <h1>Check out our Cravings</h1>
      <p className="explore-menu-text">Explore a variety of mouthwatering dishes tailored to suit every craving! From hearty meals to quick snacks and refreshing beverages, our menu is crafted to delight your taste buds. Enjoy seamless online ordering and skip the hassle of long queues—your favorite food is just a click away!

</p>

      <div className="explore-menu-list">
          {
            menu_list.map((item,index)=>{
              return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className='explore-menu-list-item'>
                  <img className={category===item.menu_name?"active":""}src={item.menu_image}/>
                  <p>{item.menu_name}</p>


                </div>
              )
            })
          }


      </div>

    </div>
  )
}

export default ExploreMenu

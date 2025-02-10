import React, { useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../src/assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "beverages"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description); // Fixed typo here
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    
    const response = await axios.post(`${url}/api/add`, formData); 
    if(response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "beverages"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-uplload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className="preview-image" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content Here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="beverages">Beverages</option>
              <option value="indian_snacks">Indian Snacks</option>
              <option value="rice">Rice</option>
              <option value="south_indian">South-Indian</option>
              <option value="todays_special">Today's Special</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="Rs 60" required />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
};

export default Add;

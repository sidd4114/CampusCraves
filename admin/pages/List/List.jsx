import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = ({url}) => {
    const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/List`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      await axios.post(`${url}/api/food/remove`, { id: foodId });
      toast.success("Food item removed successfully");
      fetchList(); // Refresh list
    } catch (error) {
      toast.error("Failed to remove food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-formate">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-formate">
            <img src={`${url}/image/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item.id)} className="cursor">x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

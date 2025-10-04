import React, { useEffect, useState, useCallback } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // ✅ useCallback si warning-ka React uusan u imaanin
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data); // sax: .data halkii ay ka ahayd .date
      } else {
        toast.error("Backend responded but success: false");
      }
    } catch (error) {
      toast.error("Request failed: " + error.message);
    }
  }, [url]);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // ✅ refresh list after delete
      } else {
        toast.error("Error deleting item");
      }
    } catch (error) {
      toast.error("Failed to remove food: " + error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]); // ✅ now properly declared as dependency

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {Array.isArray(list) && list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // ✅ Memoize fetchData to avoid eslint warning
  const fetchData = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.post(`${url}/api/order/userorders`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  }, [token, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ No more ESLint warning

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="orders-container">
        {data.length === 0 ? (
          <p className='empty-message'>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel" />
              <p className='order-items'>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}{i !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className='order-amount'>${order.amount}.00</p>
              <p className='order-count'>Items: {order.items.length}</p>
              <p className='order-status'>
                <span className="status-dot">&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchData} className='track-btn'>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;

import React, { useState, useEffect, useCallback } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="order add">
      <h2 className="order-title">📦 All Customer Orders</h2>

      <div className="order-list">
        {orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel" className="order-img" />

              <div className="order-item-details">
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>{item.name} x {item.quantity}{idx < order.items.length - 1 ? ', ' : ''}</span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>

              <div className="order-item-extra">
                <p><strong>{order.items.length}</strong> item(s)</p>
                <p><strong>${order.amount}</strong></p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

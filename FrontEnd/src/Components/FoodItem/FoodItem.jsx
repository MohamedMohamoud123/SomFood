import React, { useContext } from 'react';
import './FoodItem.css'; // Ensure this CSS file exists
import { assets } from '../../assets/assets'; // Adjust path if necessary (e.g., from '../../assets/assets')
import { StoreContext } from '../../context/StoreContext'; // Adjust path if necessary

const FoodItem = ({ id, name, price, description, image, orders, showOrders, index }) => {
  const store = useContext(StoreContext);

  // Essential check: If store context or item ID is missing, don't render
  if (!store || !id) return null;

  const { cartItems, addToCart, removeFromCart, url } = store;

  return (
    <div className='food-item' id={`food-item-${id}`}>
      <div className="food-item-img-container">
        {/* Main food image */}
        {/* Corrected src attribute: no extra curly brace */}
        <img className='food-item-img' src={`${url}/images/${image}`} alt={name} />

        {/* Order number badge (e.g., #1, #2) */}
        {/* Only display if index is provided (from TopFoods) */}
        {index !== undefined && <div className="food-item-order-badge">#{index + 1}</div>}

        {/* Add/Remove from cart controls */}
        {/* Check if item is not in cart, then show add icon */}
        {!cartItems?.[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          // If item is in cart, show counter with remove/add buttons
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{cartItems[id]}</p> {/* Quantity in cart */}
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more to Cart"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <img className="food-item-rating" src={assets.rating_starts} alt="Rating stars" />
      </div>

      <p className="food-item-desc">{description}</p>

      {/* Bottom section: Price on left, Orders count on right */}
      <div className="food-item-bottom-info">
        <p className="food-item-price">${price?.toFixed(2)}</p> {/* Display price, formatted to 2 decimal places */}
        {showOrders && ( // Only display orders if showOrders prop is true
          <p className="food-item-orders">Orders: {orders}</p>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
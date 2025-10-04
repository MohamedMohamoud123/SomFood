import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext);

  // Inta uu loading yahay
  if (loading) {
    return <p className="loading-text">Loading food items...</p>;
  }

  // Haddii food_list uu yahay mid madhan (xitaa ka dib loading)
  if (!Array.isArray(food_list) || food_list.length === 0) {
    return <p className="loading-text">No food items available right now.</p>;
  }

  // Filter by category
  const filteredList =
    category === "All"
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <FoodItem
              key={item._id || index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No dishes found for category: <strong>{category}</strong></p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;

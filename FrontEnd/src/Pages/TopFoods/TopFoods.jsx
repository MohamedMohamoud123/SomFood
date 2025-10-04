import React, { useContext, useEffect, useState } from "react";
import "./TopFoods.css"; 
import { StoreContext } from "../../context/StoreContext"; 
import FoodItem from "../../Components/FoodItem/FoodItem"; // ✅ corrected path

const TopFoods = ({ category }) => {
  // Access the base URL for API calls from the StoreContext
  const { url } = useContext(StoreContext);
  
  // State to store the fetched top food items
  const [topFoods, setTopFoods] = useState([]);
  
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch top foods whenever the URL or category changes
  useEffect(() => {
    const fetchTopFoods = async () => {
      setLoading(true); 
      try {
        let apiUrl = `${url}/api/topfoods/top`;
        
        if (category && category !== "All") {
          apiUrl = `${url}/api/topfoods/top?category=${encodeURIComponent(category)}`;
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        setTopFoods(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch top foods:", error);
        setLoading(false);
        setTopFoods([]);
      }
    };

    fetchTopFoods();
  }, [url, category]);

  if (loading) {
    return <p className="loading-text">Loading top dishes...</p>;
  }

  if (topFoods.length === 0) {
    if (category && category !== "All") {
      return (
        <p className="no-foods-message">
          No top dishes found for category: <strong>{category}</strong>
        </p>
      );
    } else {
      return <p className="no-foods-message">No top dishes available at the moment.</p>;
    }
  }

  return (
    <div className="top-foods-container">
      <h2 className="top-foods-title">Top dishes near you</h2>
      <div className="top-foods-list">
        {topFoods.map((item, index) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.foodName || item.name}
            price={item.price}
            description={item.description || "Food provides essential nutrients for overall health and well-being"}
            image={item.image}
            orders={item.totalOrders}
            showOrders={true}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TopFoods;

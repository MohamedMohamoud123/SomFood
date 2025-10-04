import React, { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from "axios";

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";  // Backend URL

  // Function to fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  // Load cart data from localStorage or API
  const loadCartData = (token) => {
    const storedCart = localStorage.getItem("cartData");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));  // Load the cart from localStorage if available
    } else {
      if (token) {
        axios.post(`${url}/api/card/get`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          if (response.data.cartData) {
            setCartItems(response.data.cartData);  // Update the cart state
            localStorage.setItem("cartData", JSON.stringify(response.data.cartData));  // Save it to localStorage
          }
        })
        .catch(err => {
          console.error("Error loading cart data:", err);
        });
      }
    }
  };

  // Add item to cart
  const addToCart = async (itemId) => {
    const newCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(newCart);
    localStorage.setItem("cartData", JSON.stringify(newCart));  // Store updated cart in localStorage

    if (token) {
      try {
        await axios.post(`${url}/api/card/add`, { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Error adding item to cart:", err);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId] > 1) {
      updatedCart[itemId] -= 1;
    } else {
      delete updatedCart[itemId];
    }
    setCartItems(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));  // Store updated cart in localStorage

    if (token) {
      try {
        await axios.post(`${url}/api/card/remove`, { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Error removing item from cart:", err);
      }
    }
  };

  // Clear cart after successful order
  const clearCartAfterOrder = () => {
    setCartItems({});  // Clear cart state
    localStorage.removeItem("cartData");  // Remove cart data from localStorage
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((food) => food._id === itemId);
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };

  useEffect(() => {
    const init = async () => {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        loadCartData(storedToken);  // Load the cart based on the token immediately
      }
    };
    init();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCartAfterOrder,  // Expose the clearCart function to the component
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

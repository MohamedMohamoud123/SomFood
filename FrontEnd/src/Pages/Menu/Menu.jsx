"use client";

import { useState, useEffect } from "react";
import "./Menu.css";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

// Background images
import bg1 from "../../assets/bg1.JPG";
import bg2 from "../../assets/bg2.WEBP";
import bg3 from "../../assets/bg3.avif";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/food_5.PNG";
import bg6 from "../../assets/food_6.PNG";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="menu">
      <div
        className="menu-top"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${backgroundImages[currentBgIndex]})`,
        }}
      >
        <h1 className="fade-text">Our Delicious Menu</h1>
        <p className="fade-text">
          Discover a variety of dishes crafted with passion. Filter by category and enjoy the taste!
        </p>
      </div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Menu;

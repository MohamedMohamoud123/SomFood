import React, { useEffect, useState } from "react";
import "./Header.css";

// Import background images
import bg1 from "../../assets/bg1.JPG";
import bg2 from "../../assets/bg2.WEBp";
import bg3 from "../../assets/bg3.avif";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/food_5.PNG";
import bg6 from "../../assets/food_6.PNG";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6];

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 2000); // 4 seconds per image
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${backgroundImages[currentImage]})`,
      }}
    >
      <div className="header-overlay" />
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from 'react';
import './Home.css';

// Import necessary components
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import AppDownload from '../../Components/AppDownload/AppDownload';
import TopFoods from '../TopFoods/TopFoods'; // ✅ corrected path

const Home = () => {
  // State to manage the currently selected category for filtering
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* Header component */}
      <Header />

      {/* ExploreMenu component for category selection */}
      <ExploreMenu category={category} setCategory={setCategory} />

      {/* TopFoods component to display filtered top dishes */}
      <TopFoods category={category} />

      {/* AppDownload component */}
      <AppDownload />
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Card from './Pages/Card/Card';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './Components/Footer/Footer';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Verify from './Pages/Verify/Verify';
import MyOrders from './Pages/MyOrders/MyOrders';
import Contact from './Pages/Contact/contact';
import Menu from './Pages/Menu/Menu'; // ✅ new
import TopFoods from './Pages/TopFoods/TopFoods';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/card' element={<Card />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/menu' element={<Menu />} /> {/* ✅ new route */}
           <Route path="/topfoods" element={<TopFoods />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;

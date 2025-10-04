import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={() => setActiveMenu("Home")}>
          <h1 className="logo-text">
            <span className="white">Som</span><span className="tomato">Food</span>
          </h1>
        </Link>
      </div>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setActiveMenu("Home")} className={activeMenu === "Home" ? "active" : ""}>Home</Link>
        <Link to="/menu" onClick={() => setActiveMenu("Menu")} className={activeMenu === "Menu" ? "active" : ""}>Menu</Link>
        <Link to="/app" onClick={() => setActiveMenu("App")} className={activeMenu === "App" ? "active" : ""}>App</Link>
        <Link to="/contact" onClick={() => setActiveMenu("Contact")} className={activeMenu === "Contact" ? "active" : ""}>Contact Us</Link>
      </div>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="icon" />

        <div className="cart-icon">
          <Link to="/card">
            <img src={assets.basket_icon} alt="Basket" />
            {getTotalCartAmount() > 0 && <div className="dot" />}
          </Link>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" /><span>Orders</span>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /><span>Logout</span>
              </li>
            </ul>
          </div>
        )}

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

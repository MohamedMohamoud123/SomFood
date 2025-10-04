import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setCartItems } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);

        const cartResponse = await axios.post(`${url}/api/card/get`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (cartResponse.data.cartData) {
          setCartItems(cartResponse.data.cartData);
          localStorage.setItem("cartData", JSON.stringify(cartResponse.data.cartData));
        }

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login or registration failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Continue with ${provider} - not implemented yet`);
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="Close" className="close-icon" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Your Password" required />
        </div>

        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>

        <p className="toggle-text">
          {currState === "Sign Up" ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")}>
            {currState === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>

        <div className="social-login-section">
          <p className="or-separator">or continue with</p>
          <div className="social-login-buttons">
            <button type="button" onClick={() => handleSocialLogin("Google")} className="google-btn">
              <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
              
            </button>
            <button type="button" onClick={() => handleSocialLogin("Facebook")} className="facebook-btn">
              <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" />
              
            </button>
            <button type="button" onClick={() => handleSocialLogin("LinkedIn")} className="linkedin-btn">
              <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" />
              
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;

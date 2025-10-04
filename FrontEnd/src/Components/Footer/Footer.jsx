import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className="footrt-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere ratione provident eligendi molestias, placeat dolor, voluptas laudantium exercitationem vel vitae laboriosam error est? Assumenda nostrum minus, distinctio atque nam magnam.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footrt-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footrt-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+252612707409</li>
            <li>maxamuudm189@gmail.com</li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer

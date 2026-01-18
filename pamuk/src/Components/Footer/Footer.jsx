import React from 'react'
import './Footer.css'
import footer_logo from '../../Assets/logo_big.png'
import instagram_icon from '../../Assets/instagram_icon.png'
import pintester_icon from '../../Assets/pintester_icon.png'
import whatsapp_icon from '../../Assets/whatsapp_icon.png'
import { react, useState } from 'react';
import { Link } from 'react-router-dom';
import GenderSelector from "../GenderSelector/GenderSelector";

const Footer = () => {

      const [menu, setMenu] = useState("shop");
      const [genderOpen, setGenderOpen] = useState(false);
      
  return (
    <div className = 'footer'>
        <div className='footer-logo'>
            <h1>WEYLOR</h1>
        </div>
        <ul className='footer-links'>
            <li onClick={() => setMenu("company")}><Link to="/company">Company</Link></li>
            <li
          onClick={() => setGenderOpen(true)}
        >Products
        </li>

        {genderOpen && (
          <GenderSelector onClose={() => setGenderOpen(false)} />
        )}
            <li onClick={() => setMenu("about")}><Link to="/about">About</Link></li>
            <li onClick={() => setMenu("contact")}><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="footer-social-icon">

  {/* Instagram */}
  <div className="footer-icons-container">
    <a
      href="https://www.instagram.com/weylor.world/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <img src={instagram_icon} alt="Instagram" />
    </a>
  </div>

  {/* Pinterest */}
  <div className="footer-icons-container">
    <a
      href="https://www.pinterest.com/weylorworld/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pinterest"
    >
      <img src={pintester_icon} alt="Pinterest" />
    </a>
  </div>

  {/* WhatsApp */}
  <div className="footer-icons-container">
    <a
      href="https://wa.me/918977913115"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsapp_icon} alt="WhatsApp" />
    </a>
  </div>

</div>

<div className="footer-copyright">
  <hr />
  <p>Copyright © 2025 – All Rights Reserved.</p>
</div>

    </div>
  )
}

export default Footer

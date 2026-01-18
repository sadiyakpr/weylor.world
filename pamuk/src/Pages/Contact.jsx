import React from 'react'
import './CSS/Contact.css'
import instagram from '../Assets/instagram_icon.png'
import pintester from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p className="contact-tagline">
            We’re here to help — thoughtfully and on time.
          </p>

          <div className="contact-block">
            <h3>Office Address</h3>
            <p>
              WEYLOR STUDIO<br />
              Hyderabad, Telangana<br />
              India
            </p>
          </div>

          <div className="contact-block">
            <h3>Working Hours</h3>
            <p>
              Monday – Saturday<br />
              10:00 AM – 6:00 PM IST
            </p>
          </div>

          <div className="contact-block">
            <h3>Email</h3>
            <p>founder@weylor.world</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <h3>Connect With Us</h3>
          <p className="contact-subtext">
            Follow our journey, collections, and values.
          </p>

          <div className="footer-social-icon">

  {/* Instagram */}
  <div className="footer-icons-container">
    <a
      href="https://www.instagram.com/weylor.world/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <img src={instagram} alt="Instagram" />
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
      <img src={pintester} alt="Pinterest" />
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
      <img src={whatsapp} alt="WhatsApp" />
    </a>
  </div>

</div>
        </div>

      </div>
    </section>
  )
}

export default Contact

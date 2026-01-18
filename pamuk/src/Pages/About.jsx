import React from 'react'
import './CSS/About.css'
import aboutImage from '../Assets/exclusive_image.png' // you can change image
import Company from './Company';
const About = () => {
  return (
    <section className="about">
      <div className="about-container">

        {/* TEXT */}
        <div className="about-content">
          <div className = 'abt'>
            <h1>About</h1><span className = 'lg-ltr-space'>WEYLOR</span>
          </div>
          <p className="about-tagline">
            Where softness meets responsibility.
          </p>

          <p>
            <span className = 'lg-ltr-space2'>WEYLOR</span> is a conscious fashion brand inspired by nature, kindness,
            and simplicity. We believe clothing
            should feel gentle — on your skin and on the Earth.
          </p>

          <p>
            Every piece is designed with intention, focusing on comfort,
            timeless aesthetics, and sustainable choices. We don’t chase trends —
            we create essentials that last.
          </p>

          <p className="about-highlight">
            <span className = 'lg-ltr-space2'>WEYLOR</span> is not just clothing or accessories. It’s a softer way of living.
          </p>
        </div>

        {/* IMAGE */}
        <div className="about-image-wrapper">
          <img src={aboutImage} alt="Weylor philosophy" />
        </div>

      </div>

      <Company/>
    </section>
  )
}

export default About

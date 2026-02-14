import React, { useState } from "react";
import './Hero2.css'
import aboutImage from '../../Assets/exclusive_image.png'
import GenderSelector from "../GenderSelector/GenderSelector";

/**
 * SEO-Optimized About / Hero Section for WEYLOR
 * Focus: semantic HTML, keyword relevance, accessibility, and image optimization
 */

const Hero2 = () => {
  const [genderOpen, setGenderOpen] = useState(false);

  return (
    <section
      className="about"
      id="about-weylor"
      aria-labelledby="about-weylor-heading"
    >
      <div className="about-container">

        {/* TEXT CONTENT */}
        <header className="about-content">
          {/* Primary H1 for brand + keyword association */}
          <h1
            id="about-weylor-heading"
            className="lg-ltr-space"
          >
            WEYLOR – Premium Sustainable Fashion Brand
          </h1>

          {/* Primary CTA */}
          <button
            className="hero-btn"
            aria-label="Explore WEYLOR sustainable fashion collections"
            onClick={() => setGenderOpen(true)}
          >
            Explore Sustainable Collections
          </button>

          {/* Modal / Selector */}
          {genderOpen && (
            <GenderSelector onClose={() => setGenderOpen(false)} />
          )}

          {/* Keyword-rich tagline
          <p className="about-tagline">
            Where softness meets responsibility in conscious, sustainable clothing.
          </p> */}

          {/* Descriptive paragraphs with natural keyword placement */}
          {/* <p className='description'>
            kindness, and simplicity. Our conscious clothing is designed to feel gentle
            on your skin while reducing impact on the earth.
            <br/>
            Every WEYLOR piece is created with intention, focusing on comfort,
            durability, and timeless design. We choose responsible materials and
            thoughtful production methods so you can wear fashion that lasts and
            matters.
          </p> */}

          {/* Supporting description with natural keywords */}
        <p className="hero-desc">
          Discover WEYLOR’s premium sustainable clothing crafted from soft,
          eco-conscious fabrics. Designed for comfort, durability, and timeless
          style — fashion that respects both you and the earth.
        </p>

        </header>

        {/* IMAGE CONTENT */}
        <figure className="about-image-wrapper">
          <img
            src={aboutImage}
            alt="WEYLOR sustainable fashion philosophy – premium conscious clothing inspired by nature"
            loading="lazy"
          />
        </figure>

      </div>
    </section>
  )
}

export default Hero2

import React from 'react'
import './Hero2.css'
import aboutImage from '../../Assets/exclusive_image.png'

/**
 * SEO-Optimized About / Hero Section for WEYLOR
 * Focus: semantic HTML, keyword relevance, accessibility, and image optimization
 */

const Hero2 = () => {
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

          {/* Keyword-rich tagline */}
          <p className="about-tagline">
            Where softness meets responsibility in conscious, sustainable clothing.
          </p>

          {/* Descriptive paragraphs with natural keyword placement */}
          <p className='description'>
            kindness, and simplicity. Our conscious clothing is designed to feel gentle
            on your skin while reducing impact on the planet.
            <br/>
            Every WEYLOR piece is created with intention, focusing on comfort,
            durability, and timeless design. We choose responsible materials and
            thoughtful production methods so you can wear fashion that lasts and
            matters.
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

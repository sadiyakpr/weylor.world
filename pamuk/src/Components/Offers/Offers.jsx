import React from 'react'
import './Offers.css'
import exclusive_image from '../../Assets/exclusive_image.png'

/**
 * SEO-Optimized Offers Section for WEYLOR
 * Focus: semantic headings, accessibility, keyword relevance, CTA clarity
 */

const Offers = () => {
  return (
    <section
      className="offers"
      aria-labelledby="offers-heading"
    >
      {/* TEXT CONTENT */}
      <header className="offers-left">
        <p className="offers-eyebrow">Limited Time Sustainable Fashion Deals</p>

        {/* SEO-safe heading structure */}
        <h2 id="offers-heading">Exclusive Offers</h2>
        <h3 className="accent">On Premium Sustainable Styles</h3>

        <p>
          Enjoy special pricing on WEYLOR’s most loved best-sellers — thoughtfully
          crafted from sustainable materials and designed for everyday elegance.
        </p>

        <button
          className="offers-btn"
          aria-label="Check exclusive sustainable fashion offers"
        >
          Explore Exclusive Offers
        </button>
      </header>

      {/* IMAGE CONTENT */}
      <figure className="offers-right">
        <img
          src={exclusive_image}
          alt="WEYLOR exclusive sustainable fashion offer on premium best-selling clothing"
          loading="lazy"
        />
      </figure>
    </section>
  )
}

export default Offers
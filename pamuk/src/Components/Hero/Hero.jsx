import React, { useState } from "react";
import "./Hero.css";
import GenderSelector from "../GenderSelector/GenderSelector";

/**
 * SEO-Optimized Hero Section for WEYLOR
 * Focus: semantic structure, keyword relevance, accessibility, CTR
 */

const Hero = () => {
  const [genderOpen, setGenderOpen] = useState(false);

  return (
    <section
      className="hero"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Decorative layers */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      {/* Main Content */}
      <div className="hero-content">
        {/* Eyebrow text for freshness & promotions */}
        <p className="hero-eyebrow typing-text">
          New Arrivals in Sustainable Fashion
        </p>

        {/* Primary H1 – strongest SEO signal */}
        <h1 id="hero-heading" className="hero-title">
          Premium Sustainable Fashion
          <br /> That Feels Good for You and the Earth
        </h1>

        {/* Supporting description with natural keywords */}
        <p className="hero-desc">
          Discover WEYLOR’s premium sustainable clothing crafted from soft,
          eco-conscious fabrics. Designed for comfort, durability, and timeless
          style — fashion that respects both you and the planet.
        </p>

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
      </div>
    </section>
  );
};

export default Hero;
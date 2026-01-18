import "./Testimonials.css";
import user1img from '../../Assets/p1_product_i1.png'
import user2img from '../../Assets/product_20.png'
import user3img from '../../Assets/product_10.png'

/**
 * SEO-Optimized Testimonials Section – WEYLOR
 * Focus: semantic structure, trust signals, accessibility, keyword relevance
 */

const Testimonials = () => {
  return (
    <section
      className="testimonials"
      aria-labelledby="testimonials-heading"
    >
      {/* Section Header */}
      <header className="testimonials-header">
        <h2 id="testimonials-heading">
          Customer Testimonials
        </h2>
        <p className="testimonials-subtitle">
          Real experiences from people who love WEYLOR’s premium sustainable fashion.
        </p>
      </header>

      {/* Testimonials Grid */}
      <div className="testimonials-grid" role="list">
        <article className="testimonial-card" role="listitem">
          <img
            className="testimonial-avatar"
            src={user1img}
            alt="Customer wearing WEYLOR premium sustainable clothing"
            loading="lazy"
            height="80"
          />
          <blockquote className="testimonial-text">
            “The quality is amazing and the fit feels effortless. WEYLOR has
            become my go-to for sustainable everyday wear.”
          </blockquote>
          <cite className="testimonial-name">Sayema</cite>
        </article>

        <article className="testimonial-card" role="listitem">
          <img
            className="testimonial-avatar"
            src={user2img}
            alt="Customer review of WEYLOR minimalist sustainable fashion"
            loading="lazy"
            height="80"
          />
          <blockquote className="testimonial-text">
            “Minimal, thoughtful, and comfortable. You can feel the intention
            behind every WEYLOR piece.”
          </blockquote>
          <cite className="testimonial-name">Rahul K.</cite>
        </article>

        <article className="testimonial-card" role="listitem">
          <img
            className="testimonial-avatar"
            src={user3img}
            alt="Customer testimonial praising WEYLOR responsible fashion"
            loading="lazy"
            height="80"
          />
          <blockquote className="testimonial-text">
            “Finally a brand that balances style with responsibility. WEYLOR sets
            a new standard for conscious fashion.”
          </blockquote>
          <cite className="testimonial-name">Meera P.</cite>
        </article>
      </div>
    </section>
  );
};

export default Testimonials;
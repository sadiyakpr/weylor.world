import React, { useEffect, useRef, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { useLocation } from 'react-router-dom'


const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const underlineRef = useRef(null);
  const location = useLocation(); // track route changes

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/popularinwomen`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch popular products");
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          // Normalize: add `id` alias for `_id`
          const normalized = data.data.map((p) => ({
            ...p,
            id: p._id,
          }));
          setPopularProducts(normalized);
        } else {
          setPopularProducts([]);
        }
      } catch (err) {
        console.error("Popular fetch error:", err);
        setError("Could not load popular products");
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);
  
  /* ---------- UI STATES ---------- */
  if (loading) {
    return <div className="popular">Loading popular products...</div>;
  }

  if (error) {
    return <div className="popular error">{error}</div>;
  }

  /* ---------- MAIN RENDER ---------- */
  return (
    <section className="popular">
      <h1>Popular in Women</h1>
      
      <div className="popular-item">
        {popularProducts.length > 0 ? (
          popularProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p className="popular-empty">No popular products available.</p>
        )}
      </div>
    </section>
  );
};

export default Popular;

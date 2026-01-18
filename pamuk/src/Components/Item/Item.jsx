import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className="item">
      {/* Product Image */}
      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <img
          src={image || "/fallback.png"} // fallback if no image
          alt={name || "Product"}
          className="item-img"
          loading="lazy"
        />
      </Link>

      {/* Product Name */}
      <p className="item-name">{name || "Unnamed Product"}</p>

      {/* Prices */}
      <div className="item-prices">
        {new_price && (
          <div className="item-price-new">₹{new_price}</div>
        )}
        {old_price && (
          <div className="item-price-old">₹{old_price}</div>
        )}
      </div>
    </div>
  );
};

export default Item;

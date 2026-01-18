import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../Assets/star_icon.png";
import star_dull_icon from "../../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!product) {
    return <div className="productdisplay-loading">Loading product...</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size");
      setSuccess("");
      return;
    }
    setError("");
    addToCart(product.id, selectedSize);
    setSuccess("Successfully added to cart!");
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(""), 3000);
  };

  const sizes = product.sizes?.length ? product.sizes : ["S", "M", "L", "XL", "XXL"];

  return (
    <section className="productdisplay">
      {/* LEFT */}
      <div className="productdisplay-left">
        <div className="productdisplay-main">
          <img
            src={product.image || "/fallback.png"}
            alt={product.name || "Product"}
            loading="lazy"
          />
        </div>

        <div className="productdisplay-thumbnails">
          {(product.images || [product.image]).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name || "Product"} view ${i + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="productdisplay-right">
        <h1>{product.name || "Unnamed Product"}</h1>

        {/* Stars */}
        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star dull" />
          <span>{product.reviewsCount || 3} Reviews</span>
        </div>

        {/* Price */}
        <div className="productdisplay-right-prices">
          {product.old_price && <span className="old">₹{product.old_price}</span>}
          {product.new_price && <span className="new">₹{product.new_price}</span>}
        </div>

        {/* Description */}
        <p className="productdisplay-desc">
          {product.description ||
            "Crafted with softness and ease, this piece is designed to move with you. Minimal. Comfortable. Thoughtfully made."}
        </p>

        {/* Sizes */}
        <div className="productdisplay-sizes">
          <p className = 'slt-sz'>Select Size</p>
          <div className="size-options">
            {sizes.map((size) => (
              <span
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => {
                  setSelectedSize(size);
                  setError("");
                  setSuccess("");
                }}
              >
                {size}
              </span>
            ))}
          </div>
          {error && <p className="size-error">{error}</p>}
          {success && <p className="size-success">{success}</p>}
        </div>

        {/* CTA */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>

        {/* Meta */}
        <div className="productdisplay-meta">
          <p>
            <span>Category:</span> {product.category || "Women / Tops"}
          </p>
          <p>
            <span>Tags:</span> {product.tags?.join(", ") || "Soft, Modern, Everyday"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;

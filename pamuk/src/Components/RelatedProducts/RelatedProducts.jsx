import React, { useContext, useEffect, useRef } from "react";
import "./RelatedProducts.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const RelatedProducts = ({ currentCategory }) => {
  const { allProducts } = useContext(ShopContext);
  const underlineRef = useRef(null);

  // 🔹 Filter products by category
  const related = allProducts.filter(
    (p) => p.category?.toLowerCase() === currentCategory?.toLowerCase()
  );

  return (
    <section className="relatedproducts">
      <h1>Related Products</h1>
      <hr ref={underlineRef} />

      <div className="relatedproducts-item">
        {related.length > 0 ? (
          related.map((item) => (
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
          <p className="relatedproducts-empty">No related products available.</p>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;

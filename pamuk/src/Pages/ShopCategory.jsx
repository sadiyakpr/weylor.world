import React, { useContext, useState, useMemo, useEffect } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { useSearchParams } from "react-router-dom";
import PromoBanner from "../Components/PromoBanner/PromoBanner";

const STEP = 8; // products per click

const ShopCategory = ({ category, banner }) => {
  const { allProducts } = useContext(ShopContext);
  const [sortType, setSortType] = useState("default");

  // Filter by category (case-insensitive)
  const filteredProducts = useMemo(() => {
    return Array.isArray(allProducts)
      ? allProducts.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === category.toLowerCase()
        )
      : [];
  }, [allProducts, category]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortType) {
      case "price-low":
        return products.sort((a, b) => a.new_price - b.new_price);

      case "price-high":
        return products.sort((a, b) => b.new_price - a.new_price);

      case "newest":
        return products.sort((a, b) => b.id - a.id);

      default:
        return products;
    }
  }, [filteredProducts, sortType]);

  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
  const savedSort = localStorage.getItem("shop-sort");
  if (savedSort) setSortType(savedSort);
}, []);

useEffect(() => {
  localStorage.setItem("shop-sort", sortType);
}, [sortType]);

const [searchParams, setSearchParams] = useSearchParams();

useEffect(() => {
  const urlSort = searchParams.get("sort");
  if (urlSort) setSortType(urlSort);
}, []);

const [visibleCount, setVisibleCount] = useState(STEP);
const [loading, setLoading] = useState(false);



  return (
    <div className="shop-category">
      
      <PromoBanner/>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {sortedProducts.length}</span> products
        </p>

        {/* SORT DROPDOWN */}
        <div className="shopcategory-sort">
  <button className = 'sort-by-btn' onClick={() => setIsSortOpen(true)}>
    Sort by
  </button>
          {isSortOpen && (
  <div className="sort-sheet-overlay" onClick={() => setIsSortOpen(false)}>
    <div
      className="sort-sheet"
      onClick={(e) => e.stopPropagation()}
    >
      <h4>Sort by</h4>

      <button onClick={() => { setSortType("newest"); setIsSortOpen(false); }}>
        Newest
      </button>

      <button onClick={() => { setSortType("price-low"); setIsSortOpen(false); }}>
        Price: Low to High
      </button>

      <button onClick={() => { setSortType("price-high"); setIsSortOpen(false); }}>
        Price: High to Low
      </button>
    </div>
  </div>
)}

        </div>
      </div>

      <div className="shopcategory-products" key={sortType}>
  {sortedProducts.length > 0 ? (
    <>
      {sortedProducts.slice(0, visibleCount).map((item) => (
        <div key={item.id} className="fade-in">
          <Item
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        </div>
      ))}

      {/* Skeleton loader */}
      {loading &&
        Array.from({ length: STEP }).map((_, i) => (
          <div key={i} className="item-skeleton" />
        ))}
    </>
  ) : (
    <p className="shopcategory-empty">
      No products found in this category.
    </p>
  )}
</div>

<div className="shopcategory-loadmore">
  {visibleCount < sortedProducts.length && !loading && (
    <button
      onClick={() => {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + STEP);
          setLoading(false);
        }, 600);
      }}
    >
      Explore More
    </button>
  )}

  {visibleCount > STEP && !loading && (
    <button
      className="view-less"
      onClick={() => setVisibleCount(STEP)}
    >
      View Less
    </button>
  )}
</div>

      </div>
  );
};

export default ShopCategory;
import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/allproducts");
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          // Normalize: add `id` alias for `_id`
          const normalized = data.data.map((p) => ({
            ...p,
            id: p._id,
          }));
          setAllProducts(normalized);
        } else {
          setAllProducts([]);
        }
      } catch (err) {
        console.error("Product fetch error:", err);
        setAllProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // ---------------- ADD TO CART ----------------
  const addToCart = (itemId, size) => {
    if (!itemId) return;
    const cartKey = size ? `${itemId}_${size}` : itemId;

    setCartItems((prev) => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId, size }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Cart updated:", data))
        .catch((err) => console.error("Add to cart error:", err));
    }
  };

  // ---------------- REMOVE FROM CART ----------------
  const removeFromCart = (itemId, size) => {
    const cartKey = size ? `${itemId}_${size}` : itemId;

    setCartItems((prev) => {
      if (!prev[cartKey]) return prev;
      const updated = { ...prev, [cartKey]: prev[cartKey] - 1 };
      if (updated[cartKey] <= 0) delete updated[cartKey];
      return updated;
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId, size }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Cart updated:", data))
        .catch((err) => console.error("Remove from cart error:", err));
    }
  };

  // ---------------- TOTAL AMOUNT ----------------
  const getTotalCartAmount = () => {
    let total = 0;

    for (const cartKey in cartItems) {
      const [id] = cartKey.split("_"); // extract productId only
      const product = allProducts.find((p) => String(p._id) === String(id));

      if (product) {
        total += product.new_price * cartItems[cartKey];
      }
    }
    return total;
  };

  // ---------------- TOTAL ITEMS ----------------
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

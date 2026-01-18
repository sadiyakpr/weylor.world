import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";


const CartItems = () => {
  const {
    allProducts,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  
  return (
    <div className="cartitems">
      {/* Header */}
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Items */}
      {allProducts.map((product) => {
        // Match against composite keys (id_size or id)
        const keys = Object.keys(cartItems).filter((key) =>
          key.startsWith(product.id)
        );

        return keys.map((cartKey) => {
          const qty = cartItems[cartKey];
          if (qty > 0) {
            return (
              <div key={cartKey}>
                <div className="cartitems-format">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="carticon-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>₹{product.new_price}</p>
                  <button className="cartitems-quantity">{qty}</button>
                  <p>₹{product.new_price * qty}</p>
                  <img
                    src={remove_icon}
                    onClick={() => {
                      // Extract size if present
                      const parts = cartKey.split("_");
                      const size = parts[1] || null;
                      removeFromCart(product.id, size);
                    }}
                    alt="remove"
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        });
      })}

      {/* Cart Summary */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Payable</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
<button
  className="proceed-btn"
  onClick={() => navigate("/checkout")}
>
  Checkout
</button>
        </div>

        {/* Promo Code */}
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button className="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

import React from "react";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Create order on backend
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment/create-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2️⃣ Open Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "WEYLOR",
        description: "Order Payment",
        order_id: data.id,
        handler: async (response) => {
          // 3️⃣ Verify payment
          await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/verify`,
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment successful");
        },
        theme: {
          color: "#292424",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <section className="payments-section">
      <div className="container">
        <h2 className="payments-title">
          Secure & Flexible Payments at Weylor
        </h2>

        <p className="payments-intro">
          At <strong>WEYLOR</strong>, checkout is designed to be effortless,
          secure, and transparent.
        </p>

        {/* ---- your existing blocks stay the same ---- */}
        {/* … payment info blocks … */}

        {/* 🔥 THIS IS WHAT WAS MISSING */}
        <div style={{ marginTop: "3rem" }}>
          <button
            onClick={handlePayment}
            className="pay-now-btn"
          >
            Pay Securely
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

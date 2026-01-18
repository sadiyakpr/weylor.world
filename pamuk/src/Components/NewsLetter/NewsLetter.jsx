import { useState } from "react";
import Toast from "../Toast/Toast";
import './NewsLetter.css'

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleSubscribe = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

if (!isValidEmail) {
  setToast({ show: true, message: "Enter a valid email address!", type: "error" });
  return;
}


    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) { 
        // backend returned 4xx or 5xx 
        const errorData = await res.json().catch(() => ({})); 
        throw new Error(errorData.message || "Server error"); 
      } 

      const data = await res.json();

      setToast({
        show: true,
        message: data.message || "Subscription successful!",
        type: "success",
      });

      setEmail("");
    } catch (err) {
      setToast({
        show: true,
        message: "Something went wrong!",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
  };

  return (
    <>
      <div className="newsletter">
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated.</p>

        <div className="subs">
          <input className = 'email-input'
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <button className = 'subscribe' onClick={handleSubscribe}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};

export default NewsLetter;

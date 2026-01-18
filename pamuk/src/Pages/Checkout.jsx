import axios from "axios";

const Checkout = () => {
  const handlePayment = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/payment/create-order",
      { amount: 999 }
    );

    const options = {
      key: "rzp_test_xxxxx", // PUBLIC key only
      amount: data.amount,
      currency: "INR",
      name: "Your Brand",
      description: "Order Payment",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      theme: { color: "#292424" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default Checkout;

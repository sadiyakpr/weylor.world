import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:5000/create-payment-intent",
      { amount: 999 }
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent.status === "succeeded") {
      alert("Payment Successful 🎉");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Pay ₹999</button>
    </form>
  );
};

export default Checkout;

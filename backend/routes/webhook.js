import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Payment successful
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("✅ Payment confirmed:", paymentIntent.id);

      // TODO:
      // 1. Find order using paymentIntent.metadata.orderId
      // 2. Mark order as PAID in DB
      // 3. Save paymentIntent.id
    }

    res.json({ received: true });
  }
);

export default app;

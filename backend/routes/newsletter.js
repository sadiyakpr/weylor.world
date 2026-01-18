const express = require("express");
const Subscriber = require("../models/Subscriber");
const { sendEmail } = require("../services/sendEmail");
const { subscription } = require("../emails/subscription");
const { createUnsubscribeUrl } = require("../utils/unsubscribeToken");

const router = express.Router(); // ✅ MUST exist BEFORE router.post

/**
 * POST /api/subscribe
 * Body: { email }
 */
router.post("/subscribe", async (req, res, next) => {
  try {
    const email = req.body.email?.toLowerCase().trim();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    // 🔍 Step 1: Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: "You are already subscribed!",
      });
    }

    // ➕ Step 2: Create new subscriber
    await Subscriber.create({ email });

    // ✉️ Step 3: Send welcome email
    const unsubscribeUrl = createUnsubscribeUrl(email);

    await sendEmail({
      to: email,
      subject: "You’re in! 🤍",
      html: subscription({ email, unsubscribeUrl }),
    });

    res.status(201).json({
      success: true,
      alreadySubscribed: false,
      message: "Subscription successful!",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

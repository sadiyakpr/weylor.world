const express = require("express");
const bcrypt = require("bcryptjs"); // or "bcrypt" depending on your install
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // adjust path to your User model
const sendEmail = require("./services/sendEmail");
const { subscription } = require("../emails/subscription")
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });

    // ✅ Send welcome email (non-blocking, don’t await)
    sendEmail({
      to: user.email,
      subject: "Welcome to Weylor 🤍",
      html: req.body.email,
    }).catch((err) => {
      console.error("Email send failed:", err);
    });

    // ✅ Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Respond
    return res.json({ success: true, token, message: "Signup successful"});
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

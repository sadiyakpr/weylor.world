/***********************
 * ENV & CORE IMPORTS
 ***********************/
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newsletterRoutes = require("./routes/newsletter");

const app = express();
const PORT = process.env.PORT || 4000;

const paymentRoutes = require("./routes/payment");

app.use(express.json());
app.use("/payment", paymentRoutes);


/***********************
 * ENV VALIDATION
 ***********************/
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("❌ Missing MONGO_URI or JWT_SECRET in .env");
  process.exit(1);
}

/***********************
 * MIDDLEWARE
 ***********************/
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

/***********************
 * DATABASE
 ***********************/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

/***********************
 * AUTH MIDDLEWARE
 ***********************/
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // 👇 decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach to request
    req.userId = decoded.userId;
    req.role = decoded.role; // 👈 role is now available

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = auth;

/***********************
 * UPLOAD CONFIG
 ***********************/
const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_, file, cb) =>
    cb(null, `img_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use("/images", express.static(uploadDir));

/***********************
 * SCHEMAS
 ***********************/
const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      new_price: { type: Number, required: true },
      old_price: { type: Number, required: true },
      available: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: { type: Object, default: {} },
    addresses: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: "user" } // 👈 NEW field
  })
);

/***********************
 * ROUTES
 ***********************/

/* BASIC */
app.get("/", (_, res) => res.send("🚀 Backend running"));

/* IMAGE UPLOAD */
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
});

/* PRODUCTS */
app.post("/addproduct", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get("/allproducts", async (_, res) => {
  const products = await Product.find({});
  res.json({ success: true, data: products });
});

app.delete("/deleteproduct/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ success: false });

  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* COLLECTIONS */
app.get("/newcollections", async (_, res) => {
  const data = await Product.find({}).sort({ createdAt: -1 }).limit(8);
  res.json({ success: true, data });
});

app.get("/popularinwomen", async (_, res) => {
  const data = await Product.find({ category: "women" })
    .sort({ createdAt: -1 })
    .limit(4);
  res.json({ success: true, data });
});


// SIGNUP//
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 👇 Default role is "user", but you can set "admin" manually if needed
    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
      role: "user"
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      role: user.role, // 👈 frontend will now store this
      message: "Signup successful"
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* LOGIN */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 👇 include role in the JWT payload
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 👇 send role back in response
    res.json({ success: true, token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ME */
app.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 👇 role will be included automatically if it's in your schema
    res.json({ success: true, user });
  } catch (err) {
    console.error("Me route error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* CART */
app.post("/addtocart", auth, async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const user = await User.findById(req.userId);

    if (!itemId) {
      return res.status(400).json({ success: false, error: "Missing product ID" });
    }

    const cartKey = size ? `${itemId}_${size}` : itemId;
    user.cartData[cartKey] = (user.cartData[cartKey] || 0) + 1;
    await user.save();

    res.json({ success: true, cartData: user.cartData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/*********************** * ADMIN DASHBOARD ***********************/ 
app.get("/admin/dashboard", auth, (req, res) => { 
  if (req.role !== "admin") { 
    return res.status(403).json({ success: false, message: "Access denied" }); 
  } 
    res.json({ success: true, message: "Welcome to the admin dashboard!" }); }); 
    app.listen(4000, () => console.log("Server running on http://localhost:4000"));

/* NEWSLETTER */
app.use("/api", require("./routes/newsletter"));

/***********************
 * GLOBAL ERROR
 ***********************/
app.use((err, req, res, next) => {
  console.error("🔥", err.stack);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Server error" : err.message,
  });
});

/***********************
 * START SERVER
 ***********************/
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on ${PORT}`)
);

/***********************
 * SHUTDOWN
 ***********************/
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  server.close(() => process.exit(0));
});

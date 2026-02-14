import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup"; // 👈 fixed path
import ScrollToTop from "./Pages/ScrollToTop"; // 👈 should be in Components
import Footer from "./Components/Footer/Footer";

import men_banner from "./Assets/banner_mens.png";
import women_banner from "./Assets/banner_women.png";

import Breadcrums from "./Components/Breadcrums/Breadcrums";
import Profile from "./Pages/Profile";
import Company from "./Pages/Company";
import Testimonials from "./Components/Testimonials/Testimonials";
import Checkout from "./Components/Checkout/Checkout";

import Pamuk from "./Pages/Pamuk"; 
import Admin from "./Pages/Admin"; 
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"; // 👈 fixed path


function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Pamuk main route */}
        <Route path="/pamuk" element={<Pamuk />} />

        {/* Admin nested inside Pamuk */}
        <Route
          path="/pamuk/admin/*"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/" element={<Shop />} />
        <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/women" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/breadcrum" element={<Breadcrums />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/company" element={<Company />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

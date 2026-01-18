import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import cart_icon from "../../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";
import login_user_img from "../../Assets/login_user.svg";
import hamburger from "../../Assets/bars-solid-full.svg";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { getTotalCartItems } = useContext(ShopContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch("http://localhost:4000/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => data.success && setUser(data.user))
      .catch(err => console.error(err));
  }, [setUser]);

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
    window.location.replace("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/" onClick={closeMenu}>
          <h1>WEYLOR</h1>
        </Link>
      </div>

      {/* Nav Menu */}
      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/men" onClick={closeMenu}>Men</Link></li>
        <li><Link to="/women" onClick={closeMenu}>Women</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>

      {/* Right Side */}
      <div className="nav-login-cart">

        {/* Hamburger */}
        <img
          src={hamburger}
          className="hamburger"
          alt="menu"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {/* Auth */}
        {user ? (
          <div
            className="user-dropdown"
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span
              className="nav-user"
              onMouseEnter={() => setDropdownOpen(true)}
            >
              <img src={login_user_img} alt="user" />
              {user.username} ▾
            </span>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <span
                  className="dropdown-item logout"
                  onClick={logout}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}

        {/* Cart */}
        <Link to="/cart">
          <div className="cart-wrapper">
            <img src={cart_icon} alt="cart" className="cart-icon" />
            <div className="nav-cart-count">
              {getTotalCartItems()}
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;

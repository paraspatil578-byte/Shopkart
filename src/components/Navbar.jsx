import { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShopKartContext } from "../context/ShopKartContext";
import "./Navbar.css";

import logo from "../assets/images/logo.png";
import searchIcon from "../assets/icons/search-icon.png";
import cartIcon from "../assets/icons/cart-icon.png";
import profileIcon from "../assets/icons/profile-icon.png";
import profileIcon2 from "../assets/icons/profile-icon-2.png";

function Navbar() {
  const { userName, cart } = useContext(ShopKartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Total quantity of all products in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const scrollToTrending = () =>
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });

  const handleTrendingClick = (e) => {
    e.preventDefault();

    // location.pathname is "/" on the home page (works with HashRouter too)
    if (location.pathname === "/") {
      scrollToTrending();
    } else {
      navigate("/");
      setTimeout(scrollToTrending, 100);
    }
  };

  return (
    <>
      {/* Top Shipping Bar */}
      <div className="top-bar">
        <div className="container-fluid">
          <span className="new-badge">NEW</span>
          Free shipping on orders above ₹499 | Easy 7-day returns
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="ShopKart" className="shopkart-logo" />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#shopKartNavbar"
            aria-controls="shopKartNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="shopKartNavbar">
            <ul className="navbar-nav main-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#trending"
                  onClick={handleTrendingClick}
                >
                  Trending 🔥
                </a>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Search */}
            <div className="search-box">
              <input type="text" placeholder="Search for products..." />

              <button className="search-btn" type="button" aria-label="Search">
                <img src={searchIcon} alt="Search" />
              </button>
            </div>

            {/* Icons */}
            <div className="nav-actions">
              {/* Cart */}
              <Link to="/cart" className="cart-wrapper" aria-label="Cart">
                <img src={cartIcon} alt="Cart" className="nav-icon" />
                <span className="cart-count">{cartCount}</span>
              </Link>

              {/* Account / Greeting */}
              {userName ? (
                <span className="user-greeting">
                  <img
                    src={profileIcon}
                    alt="Profile"
                    className="greeting-profile-icon"
                  />
                  Hello, {userName}
                </span>
              ) : (
                <div className="dropdown account-dropdown">
                  <button
                    className="account-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="My Account"
                  >
                    <img
                      src={profileIcon2}
                      alt="My Account"
                      className="profile-icon"
                    />
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end account-menu">
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
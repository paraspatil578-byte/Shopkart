import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./Home.css";

import secureIcon from "../../assets/icons/secure.png";
import clockIcon from "../../assets/icons/clock.png";
import deliveryIcon from "../../assets/icons/express-delivery.png";
import trendingIcon from "../../assets/icons/trending.png";
import cartIcon from "../../assets/icons/product-cart.png";

import electronicsImage from "../../assets/images/category-electronics.png";
import fashionImage from "../../assets/images/category-fashion.png";
import homeImage from "../../assets/images/category-home.png";
import beautyImage from "../../assets/images/category-beauty.png";
import fitnessImage from "../../assets/images/category-fitness.png";
import booksImage from "../../assets/images/category-books.png";

import headphonesImage from "../../assets/images/products/headphones.png";
import noisefitImage from "../../assets/images/products/noisefit.png";
import sneakersImage from "../../assets/images/products/sneakers.png";
import jeansImage from "../../assets/images/products/jeans.png";
import airdopesImage from "../../assets/images/products/airdopes.png";
import iphoneImage from "../../assets/images/products/iphone.png";
import ferrariImage from "../../assets/images/products/ferrari.png";
import lampImage from "../../assets/images/products/lamp.png";

// Hero background (works with any extension: png, jpg, webp...)
const heroImages = import.meta.glob("../../assets/images/hero-banner-3.*", {
  eager: true,
  import: "default",
});
const heroBanner = Object.values(heroImages)[0];

const products = [
  {
    id: 1,
    name: "boAt Rockerz 450",
    category: "Electronics",
    price: 1599,
    rating: 4.5,
    reviews: 1200,
    image: headphonesImage,
  },
  {
    id: 2,
    name: "Noise ColorFit Pro 4",
    category: "Electronics",
    price: 2999,
    rating: 4.6,
    reviews: 2300,
    image: noisefitImage,
  },
  {
    id: 3,
    name: "Red Tape Sneakers",
    category: "Fashion",
    price: 2099,
    rating: 4.5,
    reviews: 890,
    image: sneakersImage,
  },
  {
    id: 4,
    name: "Levi's Jeans",
    category: "Fashion",
    price: 2099,
    rating: 4.5,
    reviews: 890,
    image: jeansImage,
  },
  {
    id: 5,
    name: "boAt Airdopes 141",
    category: "Electronics",
    price: 1299,
    rating: 4.4,
    reviews: 3400,
    image: airdopesImage,
  },
  {
    id: 6,
    name: "iPhone 17 Pro Max",
    category: "Electronics",
    price: 124000,
    rating: 4.9,
    reviews: 2100,
    image: iphoneImage,
  },
  {
    id: 7,
    name: "Men's Casual Shirt",
    category: "Fashion",
    price: 899,
    rating: 4.3,
    reviews: 760,
    image: ferrariImage,
  },
  {
    id: 8,
    name: "Minimalist Table Lamp",
    category: "Home & Kitchen",
    price: 1199,
    rating: 4.5,
    reviews: 540,
    image: lampImage,
  },
];

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section"
        style={
          heroBanner
            ? {
                backgroundImage: `url(${heroBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="hero-content">
          <h1>
            Good Choices.
            <br />
            <span>Great Prices.</span>
          </h1>

          <p>
            Everything you need,
            <br />
            delivered to your door.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="shop-btn">
              Shop Now →
            </Link>
            <Link to="/products" className="deal-btn">
              Explore Deals
            </Link>
          </div>

          {/* Hero Benefits */}
          <div className="hero-benefits">
            <div className="benefit-item">
              <img src={secureIcon} alt="Secure payment" />
              <p>100% Secure Payments</p>
            </div>

            <div className="benefit-item">
              <img src={clockIcon} alt="Easy returns" />
              <p>7 Days Easy Returns</p>
            </div>

            <div className="benefit-item">
              <img src={deliveryIcon} alt="Fast and free delivery" />
              <p>Fast &amp; Free Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="category-section">
        <div className="section-heading">
          <h2>Shop by Category</h2>
          <Link to="/products">View All Categories →</Link>
        </div>

        <div className="category-list">
          <div className="category-card electronics">
            <img src={electronicsImage} alt="Electronics" />
            <h3>Electronics</h3>
            <p>1200+ Products</p>
          </div>

          <div className="category-card fashion">
            <img src={fashionImage} alt="Fashion" />
            <h3>Fashion</h3>
            <p>1800+ Products</p>
          </div>

          <div className="category-card home-kitchen">
            <img src={homeImage} alt="Home & Kitchen" />
            <h3>Home &amp; Kitchen</h3>
            <p>950+ Products</p>
          </div>

          <div className="category-card beauty">
            <img src={beautyImage} alt="Beauty & Personal Care" />
            <h3>Beauty &amp; Personal Care</h3>
            <p>750+ Products</p>
          </div>

          <div className="category-card sports">
            <img src={fitnessImage} alt="Sports & Fitness" />
            <h3>Sports &amp; Fitness</h3>
            <p>600+ Products</p>
          </div>

          <div className="category-card books">
            <img src={booksImage} alt="Books & Stationery" />
            <h3>Books &amp; Stationery</h3>
            <p>500+ Products</p>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="products-section" id="trending">
        <div className="section-heading">
          <div className="trending-heading">
            <h2 className="trending-title">
              <span className="trending-icon">
                <img src={trendingIcon} alt="Trending" />
              </span>

              <span>
                Trending <strong>Now</strong>
              </span>
            </h2>

            <div className="trending-accent"></div>

            <p className="trending-subtitle">
              Most popular choices this week
            </p>
          </div>

          <Link to="/products" className="view-products">
            View All Products <span>→</span>
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-details">
                <div className="product-meta">
                  <span className="product-category">{product.category}</span>
                  <span className="product-rating">
                    ⭐ {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3>{product.name}</h3>

                <div className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>

                <div className="product-actions">
                  <button className="buy-now-button">Buy Now</button>

                  <button className="cart-button" aria-label="Add to cart">
                    <img src={cartIcon} alt="Cart" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
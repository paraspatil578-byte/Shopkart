import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { ShopKartContext } from "../../context/ShopKartContext";
import { findImage } from "../../utils/findImage";
import "./Product.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
      <rect width="100%" height="100%" fill="#f1f1f1"/>
      <text x="50%" y="50%" fill="#999" font-family="Arial" font-size="18"
        text-anchor="middle" dominant-baseline="middle">No Image</text>
    </svg>`
  );

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
];

const toNumber = (value) =>
  typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));

function Products() {
  const { products, dispatch, loading, error } = useContext(ShopKartContext);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, maxPrice, selectedRating, availability]);

  // Loading and error screens (must stay AFTER all hooks)
  if (loading) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        <h2>Loading Products</h2>
        <p>Please wait while we fetch the latest products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <div className="error-icon">!</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating((previous) => (previous === rating ? 0 : rating));
  };

  const handleAvailabilityChange = (value) => {
    setAvailability((previous) => (previous === value ? "" : value));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(20000);
    setSelectedRating(0);
    setAvailability("");
  };

  const addToCart = (event, product) => {
    event.stopPropagation();

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: Number(product.id),
        name: product.name,
        category: product.category,
        image: product.image, // file name, resolved in the Cart page
        price: toNumber(product.price),
        originalPrice: toNumber(product.originalPrice),
      },
    });

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const handleImageError = (event, product) => {
    console.error("Image failed to load:", product.name, product.image);
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch = toNumber(product.price) <= maxPrice;

    const ratingMatch = Number(product.rating) >= selectedRating;

    const availabilityMatch =
      availability === "" ||
      (availability === "inStock" && product.isAvailable) ||
      (availability === "outOfStock" && !product.isAvailable);

    return categoryMatch && priceMatch && ratingMatch && availabilityMatch;
  });

  let sortedProducts = [...filteredProducts];

  if (sortOption === "price-low") {
    sortedProducts.sort((a, b) => toNumber(a.price) - toNumber(b.price));
  }
  if (sortOption === "price-high") {
    sortedProducts.sort((a, b) => toNumber(b.price) - toNumber(a.price));
  }
  if (sortOption === "rating-high") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  if (sortOption === "rating-low") {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  }
  if (sortOption === "popular") {
    sortedProducts.sort((a, b) => b.reviews - a.reviews);
  }

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />

      <main className="products-page">
        <section className="products-banner">
          <div className="banner-content">
            <h1>
              All <span>Products</span>
            </h1>
            <p>Explore our wide range of top quality products</p>
          </div>
        </section>

        <section className="products-content">
          <aside className="filter-sidebar">
            <div className="filter-title">
              <h3>FILTERS</h3>
              <button type="button" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <h4>Categories</h4>

              {CATEGORIES.map((category) => (
                <label key={category} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>

              <input
                type="range"
                min="199"
                max="20000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />

              <div className="price-range">
                <span>₹199</span>
                <span>₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="filter-group">
              <h4>Ratings</h4>

              {[5, 4, 3].map((rating) => (
                <label key={rating} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {"⭐".repeat(rating)}
                  {"☆".repeat(5 - rating)} &amp; above
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Availability</h4>

              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={availability === "inStock"}
                  onChange={() => handleAvailabilityChange("inStock")}
                />
                In Stock
              </label>

              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={availability === "outOfStock"}
                  onChange={() => handleAvailabilityChange("outOfStock")}
                />
                Out of Stock
              </label>
            </div>
          </aside>

          <div className="products-area">
            <div className="products-header">
              <p>
                Showing {sortedProducts.length} of {products.length} products
              </p>

              <div className="sort-section">
                <label htmlFor="sort">Sort By:</label>

                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating-high">Rating: High to Low</option>
                  <option value="rating-low">Rating: Low to High</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {sortedProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div
                    className="product-card"
                    key={product.id}
                    title="Click for more info"
                  >
                    <div
                      className="product-image"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      {product.discount && (
                        <span className="discount-badge">
                          -{product.discount}
                        </span>
                      )}

                      <button
                        type="button"
                        className="wishlist-button"
                        aria-label={`Add ${product.name} to wishlist`}
                        onClick={(event) => {
                          event.stopPropagation();
                          alert(`${product.name} wishlist feature coming soon!`);
                        }}
                      >
                        ♡
                      </button>

                      <img
                        src={findImage(product.image) || FALLBACK_IMAGE}
                        alt={product.name}
                        loading="lazy"
                        onError={(event) => handleImageError(event, product)}
                      />
                    </div>

                    <div
                      className="product-info"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <small>{product.category}</small>
                      <h3>{product.name}</h3>

                      <div className="rating">
                        ⭐ {Number(product.rating).toFixed(1)}
                        <span>
                          {" "}
                          ({Number(product.reviews).toLocaleString("en-IN")})
                        </span>
                      </div>

                      <div className="product-price">
                        ₹{product.price}
                        <del>₹{product.originalPrice}</del>
                      </div>

                      <button
                        type="button"
                        className="add-cart-button"
                        disabled={!product.isAvailable}
                        onClick={(event) => addToCart(event, product)}
                      >
                        {!product.isAvailable
                          ? "Out of Stock"
                          : addedProductId === product.id
                          ? "✓ Added to Cart"
                          : "🛒 Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <h3>No Products Found!</h3>
                  <p>Try changing your filters.</p>
                  <button type="button" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((previous) => Math.max(previous - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    type="button"
                    key={index + 1}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((previous) =>
                      Math.min(previous + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Products;
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./Product.css";

// Load every image in the folder. A missing file will NOT crash the app.
const imageModules = import.meta.glob(
  "../../assets/images/products/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
);

// Matches ignoring case, "-" vs "_" and extension (trolley-bag = Trolley_Bag.png)
const normalize = (text) =>
  text.toLowerCase().replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]/g, "");

const findImage = (fileName) => {
  const key = Object.keys(imageModules).find(
    (path) => normalize(path.split("/").pop()) === normalize(fileName)
  );
  if (!key) console.warn("Image file not found in products folder:", fileName);
  return key ? imageModules[key] : undefined;
};

const samsungPhone = findImage("Samsung_phone.png");
const pumaShoes = findImage("puma_shoes.png");
const amazonEcho = findImage("amazon_echo_dot.png");
const trolleyBag = findImage("trolley-bag.png");
const keyboard = findImage("keyboard.png");
const thermosBottle = findImage("thermos-bottle.png");
const lipstickSet = findImage("lipstick-set.png");
const jeans = findImage("jeans-1.png");
const mixerGrinder = findImage("mixer-grinder.png");
const printer = findImage("printer.png");
const skincareCombo = findImage("skincare-combo.png");
const nonstickPan = findImage("nonstick-pan.png");

// Local fallback (no external request, works offline)
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
      <rect width="100%" height="100%" fill="#f1f1f1"/>
      <text x="50%" y="50%" fill="#999" font-family="Arial" font-size="18"
        text-anchor="middle" dominant-baseline="middle">No Image</text>
    </svg>`
  );

const products = [
  {
    id: 1,
    name: "Samsung Galaxy M14 5G",
    category: "Electronics",
    price: "12,499",
    originalPrice: "14,999",
    rating: 4.4,
    reviews: 1850,
    discount: "17%",
    isAvailable: true,
    image: samsungPhone,
  },
  {
    id: 2,
    name: "Puma Running Shoes",
    category: "Fashion",
    price: "2,499",
    originalPrice: "3,999",
    rating: 3.8,
    reviews: 1320,
    discount: "38%",
    isAvailable: true,
    image: pumaShoes,
  },
  {
    id: 3,
    name: "Amazon Echo Dot",
    category: "Electronics",
    price: "3,499",
    originalPrice: "4,499",
    rating: 4.6,
    reviews: 2450,
    discount: "22%",
    isAvailable: true,
    image: amazonEcho,
  },
  {
    id: 4,
    name: "American Tourister Trolley Bag",
    category: "Fashion",
    price: "3,299",
    originalPrice: "4,999",
    rating: 2.9,
    reviews: 970,
    discount: "34%",
    isAvailable: false,
    image: trolleyBag,
  },
  {
    id: 5,
    name: "HP Wireless Keyboard",
    category: "Electronics",
    price: "899",
    originalPrice: "1,299",
    rating: 4.2,
    reviews: 760,
    discount: "31%",
    isAvailable: true,
    image: keyboard,
  },
  {
    id: 6,
    name: "Milton Thermosteel Bottle",
    category: "Home & Kitchen",
    price: "799",
    originalPrice: "1,099",
    rating: 3.5,
    reviews: 1540,
    discount: "27%",
    isAvailable: true,
    image: thermosBottle,
  },
  {
    id: 7,
    name: "Maybelline Lipstick Set",
    category: "Beauty",
    price: "399",
    originalPrice: "749",
    rating: 5.0,
    reviews: 820,
    discount: "47%",
    isAvailable: true,
    image: lipstickSet,
  },
  {
    id: 8,
    name: "Levi's Casual Jeans",
    category: "Fashion",
    price: "1,899",
    originalPrice: "2,999",
    rating: 4.6,
    reviews: 2100,
    discount: "37%",
    isAvailable: true,
    image: jeans,
  },
  {
    id: 9,
    name: "Bajaj Mixer Grinder",
    category: "Home & Kitchen",
    price: "2,799",
    originalPrice: "3,499",
    rating: 2.4,
    reviews: 690,
    discount: "20%",
    isAvailable: false,
    image: mixerGrinder,
  },
  {
    id: 10,
    name: "Canon Inkjet Printer",
    category: "Electronics",
    price: "5,499",
    originalPrice: "6,499",
    rating: 3.2,
    reviews: 540,
    discount: "15%",
    isAvailable: true,
    image: printer,
  },
  {
    id: 11,
    name: "Nivea Skincare Combo",
    category: "Beauty",
    price: "599",
    originalPrice: "799",
    rating: 4.5,
    reviews: 1280,
    discount: "25%",
    isAvailable: true,
    image: skincareCombo,
  },
  {
    id: 12,
    name: "Cello Non-Stick Pan",
    category: "Home & Kitchen",
    price: "999",
    originalPrice: "1,399",
    rating: 2.8,
    reviews: 475,
    discount: "29%",
    isAvailable: true,
    image: nonstickPan,
  },
];

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
];

// Converts "12,499" (or 12499) into the number 12499
const toNumber = (value) =>
  typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));

function Products({ userName, cart, dispatch }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);
  const navigate = useNavigate();

  // LAB 9 - Task 1: sorting state
  const [sortOption, setSortOption] = useState("");

  // LAB 9 - Task 2: pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // LAB 9 - Task 2: go back to page 1 when sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  // LAB 9 - Task 2: go back to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, maxPrice, selectedRating, availability]);

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
    // Don't open the details page when the button is clicked
    event.stopPropagation();

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        price: toNumber(product.price),
        originalPrice: toNumber(product.originalPrice),
      },
    });

    // Show "Added to Cart" for 2 seconds
    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const handleImageError = (event, product) => {
    console.error("Image failed to load:", product.name, product.image);
    event.currentTarget.onerror = null; // stop any error loop
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch = Number(product.price.replace(/,/g, "")) <= maxPrice;

    const ratingMatch = product.rating >= selectedRating;

    const availabilityMatch =
      availability === "" ||
      (availability === "inStock" && product.isAvailable) ||
      (availability === "outOfStock" && !product.isAvailable);

    return categoryMatch && priceMatch && ratingMatch && availabilityMatch;
  });

  // LAB 9 - Task 1: copy the filtered list so sort() doesn't change the original
  let sortedProducts = [...filteredProducts];

  // Price sorting
  if (sortOption === "price-low") {
    sortedProducts.sort(
      (a, b) =>
        Number(String(a.price).replace(/,/g, "")) -
        Number(String(b.price).replace(/,/g, ""))
    );
  }

  if (sortOption === "price-high") {
    sortedProducts.sort(
      (a, b) =>
        Number(String(b.price).replace(/,/g, "")) -
        Number(String(a.price).replace(/,/g, ""))
    );
  }

  // Rating sorting
  if (sortOption === "rating-high") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sortOption === "rating-low") {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  }

  // Popularity sorting (more reviews = more popular)
  if (sortOption === "popular") {
    sortedProducts.sort((a, b) => b.reviews - a.reviews);
  }

  // LAB 9 - Task 2: pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar userName={userName} cart={cart} />

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

              {/* LAB 9 - Task 1: sort dropdown */}
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
              {/* LAB 9: condition uses the full sorted list, map uses only the current page */}
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
                        src={product.image || FALLBACK_IMAGE}
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
                        ⭐ {product.rating.toFixed(1)}
                        <span> ({product.reviews.toLocaleString("en-IN")})</span>
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

            {/* LAB 9 - Task 2: pagination buttons below the product grid */}
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
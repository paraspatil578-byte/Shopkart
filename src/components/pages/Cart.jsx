import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { ShopKartContext } from "../../context/ShopKartContext";
import "./Cart.css";
import "./CartExtras.css";

import deleteIcon from "../../assets/icons/delete-icon.png";
import clearCartIcon from "../../assets/icons/clear-cart.png";
import couponIcon from "../../assets/icons/coupon.png";
import securityIcon from "../../assets/icons/security-icon.png";

// Works for both 1599 and "1,599"
const toNumber = (value) =>
  typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));

const formatPrice = (amount) => `₹${amount.toLocaleString("en-IN")}`;

function Cart() {
  const { cart, dispatch } = useContext(ShopKartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ---------- Calculations ----------
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + toNumber(item.price) * item.quantity,
    0
  );

  let discountPercentage = 0;

  if (subtotal >= 5000) {
    discountPercentage = 25;
  } else if (subtotal >= 3500) {
    discountPercentage = 20;
  } else if (subtotal >= 2000) {
    discountPercentage = 10;
  }

  const discount = Math.round((subtotal * discountPercentage) / 100);

  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 40;

  const totalAmount = subtotal - discount + shipping;

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="cart-container">
          {cart.length === 0 ? (
            /* ---------- Empty Cart ---------- */
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>

              <h2>Your Cart is Empty</h2>

              <p>Add some products to your cart to continue shopping.</p>

              <Link to="/products" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* ---------- Cart Table ---------- */}
              <div className="cart-table-wrapper">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>TOTAL</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.map((item) => (
                      <tr className="cart-item-row" key={item.id}>
                        <td>
                          <div className="cart-product">
                            <div className="cart-product-image">
                              <img src={item.image} alt={item.name} />
                            </div>

                            <div className="cart-product-info">
                              <h3>{item.name}</h3>
                              <p className="cart-category">{item.category}</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="cart-price">
                            <strong>{formatPrice(toNumber(item.price))}</strong>
                            <span className="original-price">
                              {formatPrice(toNumber(item.originalPrice))}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="quantity-control">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                dispatch({
                                  type: "DECREASE_QUANTITY",
                                  payload: item.id,
                                })
                              }
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                dispatch({
                                  type: "INCREASE_QUANTITY",
                                  payload: item.id,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          <strong className="item-total">
                            {formatPrice(toNumber(item.price) * item.quantity)}
                          </strong>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="delete-btn"
                            aria-label={`Remove ${item.name}`}
                            onClick={() =>
                              dispatch({ type: "REMOVE_ITEM", payload: item.id })
                            }
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Clear Cart */}
                <div className="cart-footer">
                  <button
                    type="button"
                    className="clear-cart-btn"
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                  >
                    <img src={clearCartIcon} alt="" />
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* ---------- Order Summary ---------- */}
              <aside className="cart-sidebar">
                <div className="order-summary">
                  <h2>Order Summary</h2>

                  <div className="summary-row">
                    <span>
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="summary-row discount-row">
                    <span>
                      Discount
                      {discountPercentage > 0 && ` (${discountPercentage}%)`}
                    </span>
                    <span>-{formatPrice(discount)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      <span>{formatPrice(shipping)}</span>
                    )}
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-total">
                    <span>Total Amount</span>
                    <strong>{formatPrice(totalAmount)}</strong>
                  </div>

                  {discount > 0 && (
                    <p className="saved-message">
                      You saved {formatPrice(discount)} on this order
                    </p>
                  )}

                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={() => setOrderPlaced(true)}
                  >
                    Proceed to Checkout
                    <span>→</span>
                  </button>

                  <button type="button" className="coupon-btn">
                    <img src={couponIcon} alt="" />
                    Apply Coupon
                  </button>
                </div>

                {/* Secure Payment */}
                <div className="secure-box">
                  <img src={securityIcon} alt="" className="secure-icon" />

                  <div>
                    <h3>Safe &amp; Secure Payments</h3>
                    <p>
                      100% secure payments. Easy returns. Your data is protected.
                    </p>
                  </div>
                </div>
              </aside>
            </>
          )}
        </div>

        {/* Continue Shopping */}
        {cart.length > 0 && (
          <div className="cart-navigation">
            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        )}

        {/* Order Placed Popup */}
        {orderPlaced && (
          <div className="order-popup-overlay">
            <div className="order-popup">
              <div className="success-icon">✓</div>
              <h2>Order Placed Successfully!</h2>
              <p>Your order has been placed successfully.</p>
              <button
                type="button"
                className="popup-ok-btn"
                onClick={() => setOrderPlaced(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
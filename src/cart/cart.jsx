import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import "../styles/cart.css";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    return (
        <div className="cart-page-container">

            {cartItems.length === 0 ? (
                <div className="empty-cart-state">
                    <img src="/no-data.gif" alt="Empty Cart" width="180" />
                    <h2>Your bag is empty</h2>
                    <p>Don't let the rhythm stop. Explore our latest drops.</p>
                    <button className="shop-now-btn" onClick={() => navigate("/products/catalog/view")}>
                        Go to Catalog
                    </button>
                </div>
            ) : (
                <div className="cart-layout">
                    {/* Left Side: Items */}
                    <div className="cart-items-column">
                        {cartItems.map((item, index) => (
                            <div className="cart-item-row" key={`${item.id}-${index}`}>
                                <div className="cart-item-image">
                                    <img src={item.images?.[0] || "/placeholder-shoe.png"} alt={item.name} />
                                </div>
                                <div className="cart-item-info">
                                    <p className="category-tag">{item.category}</p>
                                    <h3>{item.name}</h3>
                                    <p className="nickname">{item.nickname}</p>
                                    <h2 className="item-price">₱{Number(item.price).toLocaleString()}</h2>
                                </div>
                                <div className="cart-item-actions">
                                    <button className="remove-item-btn" onClick={() => removeFromCart(index)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Summary Card */}
                    <div className="cart-summary-column">
                        <div className="summary-card">
                            <h2>Order Summary</h2>
                            <div className="summary-details">
                                <div className="summary-line">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>₱{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="summary-line">
                                    <span>Shipping</span>
                                    <span className="free-tag">FREE</span>
                                </div>
                                <div className="summary-line">
                                    <span>Tax</span>
                                    <span>Included</span>
                                </div>
                                <hr />
                                <div className="summary-line total">
                                    <span>Total</span>
                                    <span>₱{subtotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <button className="checkout-action-btn">
                                Proceed to Checkout
                            </button>
                            <p className="secure-text">🔒 Secure Checkout Guaranteed</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
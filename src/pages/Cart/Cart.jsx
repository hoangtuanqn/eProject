
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/cart.css";
import products from "../../data/product.json";
import { useCartActions } from "../../utils/handleCart";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [notes, setNotes] = useState({});
    const [postalCode, setPostalCode] = useState("");
    const [isCalculating, setIsCalculating] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const { handleCartAction, getUpdatedCartItems } = useCartActions();

    useEffect(() => {
        const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
        const cartWithDetails = cartStorage
            .map((item) => {
                const productDetails = products.find((p) => p.id === item.id);
                return productDetails
                    ? {
                          ...productDetails,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity || 1,
                          note: notes[item.id] || "",
                      }
                    : null;
            })
            .filter((item) => item);
        setCartItems(cartWithDetails);
    }, [notes]);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item,
        );
        setCartItems(updatedCart);
        localStorage.setItem(
            "cart",
            JSON.stringify(
                updatedCart.map(({ id, size, color, quantity }) => ({
                    id,
                    size,
                    color,
                    quantity,
                })),
            ),
        );
    };

    const handleRemoveItem = async (id) => {
        setDeletingItemId(id);
        const product = products.find((p) => p.id === id);
        const updatedCart = await handleCartAction(product);
        if (updatedCart) {
            setCartItems(getUpdatedCartItems(updatedCart, true));
        }
        setDeletingItemId(null);
    };

    const handleNoteChange = (id, note) => {
        setNotes((prev) => ({
            ...prev,
            [id]: note,
        }));
    };

    const calculateShipping = async () => {
        setIsCalculating(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setShippingCost(50000);
        setIsCalculating(false);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <section className="cart-page">
            <div className="container">
                {/* <h1 className="section-title">Shopping Cart</h1>
                <p className="section-subtitle">Review your items and checkout</p> */}

                {cartItems.length > 0 ? (
                    <div className="cart-page__layout">
                        <div className="cart-page__items">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item) => (
                                    <motion.article
                                        key={item.id}
                                        className="cart-page__item"
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            marginBottom: 0,
                                            marginLeft: -200,
                                            transition: {
                                                opacity: { duration: 0.2 },
                                                height: { duration: 0.3, delay: 0.1 },
                                            },
                                        }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="cart-page__item-image">
                                            <img src={item.thumbnail || "/placeholder.svg"} alt={item.name} />
                                        </div>
                                        <div className="cart-page__item-details">
                                            <div className="cart-page__item-info">
                                                <span className="cart-page__item-category">{item.category}</span>
                                                <h3 className="cart-page__item-name">{item.name}</h3>
                                                <div className="cart-item__details">
                                                    <div className="cart-item__detail">
                                                        <span className="cart-item__label">Size:</span>
                                                        <span className="cart-item__value">{item.size}</span>
                                                    </div>
                                                    <div className="cart-item__detail">
                                                        <span className="cart-item__label">Color:</span>
                                                        <span className="cart-item__value">{item.color}</span>
                                                    </div>
                                                </div>
                                                <span className="cart-item__current-price">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </span>
                                            </div>

                                            <div className="cart-page__item-actions">
                                                <div className="product__quantity-input">
                                                    <button
                                                        className="product__quantity-button"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        className="product__quantity-number"
                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                Number.parseInt(e.target.value),
                                                            )
                                                        }
                                                        min="1"
                                                    />
                                                    <button
                                                        className="product__quantity-button"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    className="cart-page__remove-btn"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    disabled={deletingItemId === item.id}
                                                >
                                                    {deletingItemId === item.id ? (
                                                        <img
                                                            src="/assets/icon/loading.gif"
                                                            alt="Loading..."
                                                            className="loading-spinner"
                                                        />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-page__item-note">
                                            <textarea
                                                placeholder="Add note about this item"
                                                value={notes[item.id] || ""}
                                                onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                                rows="2"
                                            />
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="cart-page__summary">
                            <div className="cart-page__shipping">
                                <h3>Estimate Shipping</h3>
                                <div className="cart-page__shipping-form">
                                    <input
                                        type="text"
                                        placeholder="Enter postal code"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                    <button
                                        className="cart-page__calculate-btn"
                                        onClick={calculateShipping}
                                        disabled={isCalculating || !postalCode}
                                    >
                                        {isCalculating ? (
                                            <img
                                                src="/assets/icon/loading.gif"
                                                alt="Loading..."
                                                className="loading-spinner"
                                            />
                                        ) : (
                                            <>
                                                <Calculator size={16} />
                                                Calculate
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="cart-page__totals">
                                <div className="cart-page__totals-row">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(calculateSubtotal())}</span>
                                </div>
                                <div className="cart-page__totals-row">
                                    <span>Shipping</span>
                                    <span>{shippingCost ? formatCurrency(shippingCost) : "Calculate above"}</span>
                                </div>
                                <div className="cart-page__totals-row cart-page__totals-row--total">
                                    <span>Total</span>
                                    <span>{formatCurrency(calculateSubtotal() + shippingCost)}</span>
                                </div>

                                <Link to="/checkouts" className="cart-page__checkout-btn">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        className="cart-page__empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <img src="/assets/imgs/cart_empty.png" alt="Empty cart" />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet.</p>
                        <Link to="/categories" className="btn cart__btn">
                            Continue Shopping
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

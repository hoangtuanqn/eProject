import React, { useRef, useEffect, useState, forwardRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { closeWithAnimation, handleClickOutside } from "../../utils/menuHelpers";
import "../../styles/menuCart.css";
import { Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import products from "../../data/products.json";
import clsx from "clsx";
import { useCartActions } from "../../utils/handleCart";
import { useGlobalState } from "../../context/GlobalContext";
import { toast } from "react-hot-toast";

const MenuCart = forwardRef(({ isOpen, onClose }, ref) => {
    const { cartQuantity, setCartQuantity, wishlistQuantity, setWishlistQuantity } = useGlobalState();
    const [cartItems, setCartItems] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const [isClearing, setIsClearing] = useState(false);
    const navigate = useNavigate();
    const { handleCartAction, getUpdatedCartItems } = useCartActions();

    // Load cart items from localStorage and match with product data
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
                          quantity: item.quantity, // Default quantity
                      }
                    : null;
            })
            .filter((item) => item); // Remove any null items

        setCartItems(cartWithDetails);
    }, [cartQuantity]);
    useLayoutEffect(() => {
        setCartQuantity(cartItems.length);
    }, [cartItems]);
    useLayoutEffect(() => {
        setWishlistQuantity(JSON.parse(localStorage.getItem("wishlist") ?? "[]").length || 0);
    }, [wishlistQuantity]);

    const handleClose = () => {
        closeWithAnimation(ref);
        onClose();
    };

    const handleQuantityInput = (id, value) => {
        const newQuantity = Math.max(1, parseInt(value) || 1);

        // Update state
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }),
        );

        // Update localStorage
        const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cartStorage.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemoveItem = async (id) => {
        setDeletingItemId(id);
        const product = products.find((p) => p.id === id);
        const updatedCart = await handleCartAction(product);
        if (updatedCart) {
            setCartItems(getUpdatedCartItems(updatedCart));
        }
        setDeletingItemId(null);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const numberTotal = calculateSubtotal();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const handleClearCart = async () => {
        if (window.confirm("Are you sure you want to clear your cart?")) {
            setIsClearing(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            localStorage.setItem("cart", "[]");
            setCartItems([]);
            setIsClearing(false);
            toast.success("Cart cleared successfully");
        }
    };

    return (
        <div
            ref={ref}
            className={clsx("cart", { active: isOpen })}
            onClick={(e) => handleClickOutside(e, ref, onClose)}
        >
            <div className="cart__list">
                <div className="cart__header">
                    <h2 className="cart__title">Shopping Cart</h2>
                    <button className="cart__close" onClick={handleClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart__items-container">
                    {cartItems.length > 0 && (
                        <button className="cart-page__clear-btn" onClick={handleClearCart} disabled={isClearing}>
                            {isClearing ? (
                                <img src="/assets/icon/loading.gif" alt="Loading..." className="loading-spinner" />
                            ) : (
                                <>
                                    <Trash2 size={16} />
                                    Clear Cart
                                </>
                            )}
                        </button>
                    )}

                    <AnimatePresence mode="popLayout">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <motion.article
                                    key={item.id}
                                    className="cart-item"
                                    layout
                                    initial={{ opacity: 1 }}
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
                                >
                                    <div className="cart-item__top">
                                        <img src={item.thumbnail} alt={item.name} className="cart-item__img" />
                                        <div className="cart-item__info">
                                            <span className="cart-item__category">{item.category}</span>
                                            <h3 className="cart-item__name">{item.name}</h3>
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
                                            <div className="cart-item__price">
                                                <span
                                                    className="cart-item__current-price line-clamp"
                                                    style={{ "--line-clamp": 4 }}
                                                >
                                                    {formatCurrency(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-item__actions">
                                        <div className="product__quantity-input">
                                            <button
                                                className="product__quantity-button"
                                                onClick={() => handleQuantityInput(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                className="product__quantity-number"
                                                onChange={(e) => handleQuantityInput(item.id, e.target.value)}
                                                min="1"
                                            />
                                            <button
                                                className="product__quantity-button"
                                                onClick={() => handleQuantityInput(item.id, item.quantity + 1)}
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
                                </motion.article>
                            ))
                        ) : (
                            <div className="cart__empty">
                                <img src="/assets/imgs/cart_empty.png" alt="Empty cart" className="cart__empty-img" />
                                <p className="cart__empty-text">Your cart is empty</p>
                                <button
                                    className="btn cart__empty-button"
                                    onClick={() => {
                                        handleClose();
                                        navigate("/categories");
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="cart__footer">
                    <div className="cart__subtotal">
                        <span className="cart__subtotal-label">Subtotal</span>
                        <span className="cart__subtotal-amount">{formatCurrency(numberTotal)}</span>
                    </div>

                    <div className="cart__buttons">
                        {numberTotal > 0 ? (
                            <>
                                <Link to="/cart" onClick={handleClose} className="cart__button cart__button--outline">
                                    View Cart
                                </Link>
                                <Link to="/cart" onClick={handleClose} className="cart__button cart__button--filled">
                                    Check Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <span className="cart__button cart__button--outline disabled">View Cart</span>
                                <span className="cart__button cart__button--filled disabled">Check Out</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MenuCart;

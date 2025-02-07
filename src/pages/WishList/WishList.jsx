import { useState, useEffect, useMemo } from "react";
import { ShoppingCartIcon, Eye, Heart, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartActions } from "../../utils/handleCart";
import "../../styles/wishList.css";
import products from "../../data/products.json";
import { useWishlistActions } from "../../utils/handleWishlist";
export default function WishList() {
    const { handleWishlistAction, isProductInWishlist, loadingStates: wishlistLoadingStates } = useWishlistActions();
    const handleGetWishlist = () => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    };
    const [wishlist, setWishlist] = useState(handleGetWishlist);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const { handleCartAction, isProductInCart, loadingStates: cartLoadingStates } = useCartActions();

    const removeFromWishlist = async (product) => {
        setDeletingItemId(product.id);
        // Đợi animation hoàn thành (300ms) trước khi xóa
        await new Promise((resolve) => setTimeout(resolve, 300));
        await handleWishlistAction(product);
        setWishlist(handleGetWishlist());
        setDeletingItemId(null);
    };

    return (
        <section className="wish-list">
            <div className="container">
                {wishlist.length > 0 ? (
                    <div className="wish-list__grid">
                        <AnimatePresence mode="popLayout">
                            {wishlist.map((index) => {
                                // Check if product exists at this index
                                if (!products[index]) return null;

                                const product = products[index - 1];
                                return (
                                    <motion.article
                                        key={index}
                                        className="wish-list-item"
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
                                        <figure className="wish-list-item__image">
                                            {product.sale !== 0 && <span className="badge__sale">SALE</span>}
                                            <img src={product.thumbnail || "/placeholder.svg"} alt={product.name} />
                                            <div className="wish-list-item__actions">
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="action-btn"
                                                    title="View product"
                                                >
                                                    <Eye size={20} />
                                                </Link>
                                                <button
                                                    className={`cart-btn action-btn ${
                                                        cartLoadingStates[product.id] ? "loading" : ""
                                                    } ${isProductInCart(product.id) ? "in-cart" : ""}`}
                                                    onClick={() => handleCartAction(product)}
                                                    disabled={cartLoadingStates[product.id]}
                                                    title={
                                                        isProductInCart(product.id) ? "Remove from cart" : "Add to cart"
                                                    }
                                                >
                                                    {cartLoadingStates[product.id] ? (
                                                        <img
                                                            src="/assets/icon/loading.gif"
                                                            alt="Loading..."
                                                            className="loading-spinner"
                                                        />
                                                    ) : (
                                                        <ShoppingCartIcon size={20} />
                                                    )}
                                                </button>
                                                <button
                                                    className="action-btn"
                                                    title="Remove from wishlist"
                                                    onClick={() => removeFromWishlist(product)}
                                                    disabled={deletingItemId === product.id}
                                                >
                                                    {deletingItemId === product.id ? (
                                                        <img
                                                            src="/assets/icon/loading.gif"
                                                            alt="Loading..."
                                                            className="loading-spinner"
                                                        />
                                                    ) : (
                                                        <Trash2Icon size={20} />
                                                    )}
                                                </button>
                                            </div>
                                        </figure>
                                        <h3 className="wish-list-item__name">{product.name}</h3>
                                        <p className="category__product-price">
                                            ${Math.round(product.discounted_price || product.price)}
                                            {product.sale > 0 && (
                                                <span className="category__product-price--old">
                                                    ${Math.round(product.price)}
                                                </span>
                                            )}
                                        </p>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="wish-list__empty">
                        <Heart className="wish-list__empty-icon" />
                        <p className="wish-list__empty-text">Your wishlist is empty</p>
                    </div>
                )}
            </div>
        </section>
    );
}

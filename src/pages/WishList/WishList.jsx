import { useState, useEffect, useMemo } from "react";
import { Heart, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartActions } from "../../utils/handleCart";
import "../../styles/wishList.css";
import products from "../../data/products.json";
import { useWishlistActions } from "../../utils/handleWishlist";
import { Rating } from "@mui/material";
export default function WishList() {
    const { handleWishlistAction } = useWishlistActions();
    const handleGetWishlist = () => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    };
    const [wishlist, setWishlist] = useState(handleGetWishlist);
    const [deletingItemId, setDeletingItemId] = useState(null);

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
                    <div className="featured-products__grid">
                        <AnimatePresence mode="popLayout">
                            {wishlist.map((index) => {
                                if (!products[index]) return null;

                                const product = products.find((product) => product.id === index);
                                return (
                                    <motion.article
                                        key={index}
                                        className="product-card"
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
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
                                        <figure className="category-product__wrapper">
                                            {product.sale !== 0 && (
                                                <span className="badge__sale">{`${product.sale}% OFF`}</span>
                                            )}
                                            <div className="image-wrapper">
                                                <Link to={`/product/${product.slug}`}>
                                                    <img
                                                        src={product.thumbnail || "/placeholder.svg"}
                                                        alt={product.name}
                                                        className="category__product-image"
                                                    />
                                                </Link>
                                                <div className="product-card__actions">
                                                    {/* <Link
                                                        to={`/product/${product.id}`}
                                                        className="action-btn"
                                                        title="View product"
                                                    >
                                                        <Eye size={20} />
                                                    </Link> */}
                                                    {/* <button
                                                        className={`action-btn ${
                                                            cartLoadingStates[product.id] ? "loading" : ""
                                                        } ${isProductInCart(product.id) ? "in-cart" : ""}`}
                                                        onClick={() => handleCartAction(product)}
                                                        disabled={cartLoadingStates[product.id]}
                                                        title={
                                                            isProductInCart(product.id)
                                                                ? "Remove from cart"
                                                                : "Add to cart"
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
                                                    </button> */}
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
                                            </div>
                                        </figure>
                                        <div className="category__product-details">
                                            <div className="product-card__rating-wrap">
                                                <Rating
                                                    name="read-only"
                                                    value={product.rating}
                                                    precision={0.1}
                                                    readOnly
                                                    size="small"
                                                    sx={{
                                                        fontSize: "1.8rem",
                                                        color: "#ffd700",
                                                    }}
                                                />
                                                <span className="best-sales-item__rating-value">
                                                    ({product.rating.toFixed(1)})
                                                </span>
                                            </div>
                                            <h3 className="category__product-name">{product.name}</h3>
                                            <p className="category__product-price">
                                                ${Math.round(product.discounted_price || product.price)}
                                                {product.sale > 0 && (
                                                    <span className="category__product-price--old">
                                                        ${Math.round(product.price)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
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

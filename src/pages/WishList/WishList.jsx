import { useState, useEffect } from "react";
import "../../styles/wishList.css";
import productsData from "../../data/product.json";
import { ShoppingCartIcon, Eye, Heart, Trash2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function WishList() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Lấy các sản phẩm có sale > 0 làm ví dụ
        const initialWishlist = productsData
            .filter((product) => product.sale > 0)
            .slice(0, 4)
            .map((product) => product.id);
        setWishlist(initialWishlist);
    }, []);

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((itemId) => itemId !== id));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
    };

    const getDiscountedPrice = (price, salePercent) => {
        return price - (price * salePercent) / 100;
    };

    return (
        <section className="wish-list">
            <div className="container">
                {wishlist.length > 0 ? (
                    <motion.div
                        className="wish-list__grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnimatePresence>
                            {wishlist.map((itemId, index) => {
                                const product = productsData.find((p) => p.id === itemId);
                                return (
                                    <motion.article
                                        key={product.id}
                                        className="wish-list-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <figure className="wish-list-item__image">
                                            {product.sale > 0 && (
                                                <span className="badge__sale">SALE {product.sale}%</span>
                                            )}
                                            <img src={product.thumbnail || "/placeholder.svg"} alt={product.name} />
                                            <div className="wish-list-item__actions">
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="action-btn"
                                                    title="View product"
                                                >
                                                    <Eye size={20} />
                                                </Link>
                                                <button className="action-btn" title="Add to cart">
                                                    <ShoppingCartIcon size={20} />
                                                </button>
                                                <button
                                                    className="action-btn"
                                                    title="Remove from wishlist"
                                                    onClick={() => removeFromWishlist(product.id)}
                                                >
                                                    <Trash2Icon size={20} />
                                                </button>
                                            </div>
                                        </figure>
                                        <h3 className="wish-list-item__name">{product.name}</h3>
                                        <p className="wish-list-item__price">
                                            {product.sale > 0 && (
                                                <span className="wish-list-item__price--old">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                            {formatPrice(getDiscountedPrice(product.price, product.sale))}
                                        </p>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        className="wish-list__empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: "30vh" }}
                    >
                        <Heart className="wish-list__empty-icon" />
                        <p className="wish-list__empty-text">Your wishlist is empty</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

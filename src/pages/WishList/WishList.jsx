import { useState, useEffect } from "react";
import "../../styles/wishList.css";
// import wishlistData from "../data/wishlist.json";
import { ShoppingCartIcon, Eye, Heart, Trash2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function WishList() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        setWishlist([
            {
                id: 1,
                name: "Áo thun nam cổ tròn",
                price: "250000",
                discounted_price: "200000",
                image: "/assets/imgs/product-1.png",
                sale: true,
                quantity: 1,
            },
            {
                id: 2,
                name: "Quần jean nữ ống rộng",
                price: "450000",
                discounted_price: null,
                image: "/assets/imgs/product-2.png",
                sale: false,
                quantity: 1,
            },
            {
                id: 3,
                name: "Áo khoác denim unisex",
                price: "650000",
                discounted_price: "550000",
                image: "/assets/imgs/product-3.png",
                sale: true,
                quantity: 1,
            },
            {
                id: 4,
                name: "Váy hoa dáng xòe",
                price: "350000",
                discounted_price: null,
                image: "/assets/imgs/product-4.png",
                sale: false,
                quantity: 1,
            },
        ]);
    }, []);

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((item) => item.id !== id));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    return (
        <section className="wish-list">
            <div className="container">
                <h2 className="section-title">My Wishlist</h2>
                <p className="section-subtitle">Your favorite items are waiting for you</p>

                {wishlist.length > 0 ? (
                    <motion.div
                        className="wish-list__grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnimatePresence>
                            {wishlist.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    className="wish-list-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <figure className="wish-list-item__image">
                                        {item.sale && <span className="badge__sale">SALE</span>}
                                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                                        <div className="wish-list-item__actions">
                                            <Link
                                                to={`/product/${item.id}`}
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
                                                onClick={() => removeFromWishlist(item.id)}
                                            >
                                                <Trash2Icon size={20} />
                                            </button>
                                        </div>
                                    </figure>
                                    <h3 className="wish-list-item__name">{item.name}</h3>
                                    <p className="wish-list-item__price">
                                        {formatPrice(item.price)}
                                        {item.discounted_price && (
                                            <span className="wish-list-item__price--old">
                                                {formatPrice(item.discounted_price)}
                                            </span>
                                        )}
                                    </p>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        className="wish-list__empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Heart className="wish-list__empty-icon" />
                        <p className="wish-list__empty-text">Your wishlist is empty</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

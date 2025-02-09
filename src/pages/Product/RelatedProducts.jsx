import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { Heart } from "lucide-react";

export default function RelatedProducts({ relatedProducts, handleWishlistAction }) {
    return (
        <section className="related-products">
            <h2>Related Products</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {relatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <motion.article className="product-card">
                            <figure className="category-product__wrapper">
                                {product.sale > 0 && <span className="badge__sale">{`${product.sale}% OFF`}</span>}
                                <div className="image-wrapper">
                                    <Link to={`/product/${product.slug}`}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="category__product-image"
                                        />
                                    </Link>
                                    <div className="product-card__actions">
                                        <button className="action-btn" onClick={() => handleWishlistAction(product)}>
                                            <Heart size={20} />
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
                                    <span className="best-sales-item__rating-value">({product.rating.toFixed(1)})</span>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

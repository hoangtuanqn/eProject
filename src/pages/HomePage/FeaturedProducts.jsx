import React from "react";
import { Eye, Heart, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import productData from "../../data/product.json";
import "../../styles/featuredProducts.css";

export default function FeaturedProducts() {
    // Lọc sản phẩm có feature=true và giới hạn 8 sản phẩm
    const featuredProducts = productData.filter((product) => product.feature).slice(0, 8);

    return (
        <>
            <section className="featured-products">
                <div className="container">
                    <div className="section-top">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">
                            Discover our premium school uniforms - Crafted with care and designed for comfort, our
                            collection features high-quality materials and timeless styles
                        </p>
                    </div>

                    <div className="featured-products__grid">
                        {featuredProducts.map(({ id, name, price, sale, thumbnail }) => {
                            const originalPrice = price;
                            const salePrice = sale > 0 ? price * (1 - sale / 100) : price;

                            return (
                                <article key={id} className="product-card" data-aos="zoom-in">
                                    <figure className="collections-product__wrapper">
                                        {sale > 0 && <span className="badge__sale">{`${sale}% OFF`}</span>}
                                        <img src={thumbnail} alt={name} className="collections__product-image" />
                                        <div className="product-actions">
                                            <button className="product-action-btn" title="Add to cart">
                                                <ShoppingCartIcon size={20} />
                                            </button>
                                            <button className="product-action-btn" title="Quick view">
                                                <Eye size={20} />
                                            </button>
                                            <button className="product-action-btn" title="Add to wishlist">
                                                <Heart size={20} />
                                            </button>
                                        </div>
                                    </figure>
                                    {/* Tái sử dụng collections bên Category.css */}
                                    <div className="collections__product-details">
                                        <h3 className="collections__product-name">{name}</h3>
                                        <p className="collections__product-price">
                                            ${Math.round(salePrice)}
                                            {sale > 0 && (
                                                <span className="collections__product-price--old">
                                                    ${Math.round(originalPrice)}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

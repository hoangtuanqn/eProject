import React from "react";
import { Plus, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import featuredProductsData from "../../data/featured-products.json";
import "../../styles/featuredProducts.css";

export default function FeaturedProducts() {
    return (
        <>
            {/* Featured Products Section */}
            <section className="featured-products">
                <div className="container">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">We have your occasion covered</p>

                    <div className="featured-products__grid">
                        {featuredProductsData.map(({ id, name, price, discounted_price, image, sale }) => {
                            return (
                                <article key={id} className="product-card" data-aos="zoom-in">
                                    <figure className="product-card__wrapper">
                                        {sale && <span className="badge__sale">SALE</span>}
                                        <img src={image} alt={name} className="product-card__image" />
                                        <div className="product-card__actions">
                                            <button className="action-btn" title="Quick view">
                                                <Plus size={20} />
                                            </button>
                                            <button className="action-btn" title="Compare">
                                                <Eye size={20} />
                                            </button>
                                            <Link to="/" className="action-btn" title="Add to wishlist">
                                                <Heart size={20} />
                                            </Link>
                                        </div>
                                    </figure>
                                    <figcaption className="product-card__name">{name}</figcaption>
                                    <p className="product-card__price">
                                        {price}₫{" "}
                                        {sale && <span className="product-card__price--old">{discounted_price}₫</span>}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

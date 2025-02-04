import React from "react";
import { Eye, Heart, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productData from "../../data/product.json";
import { useCartActions } from "../../utils/handleCart";
import "../../styles/featuredProducts.css";

export default function FeaturedProducts() {
    const { handleCartAction, isProductInCart, loadingStates } = useCartActions();
    const featuredProducts = productData.filter((product) => product.feature).slice(0, 8);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                        {featuredProducts.map((product) => {
                            const { id, name, price, sale, thumbnail, slug } = product;
                            const originalPrice = price;
                            const salePrice = sale > 0 ? price * (1 - sale / 100) : price;
                            const inCart = isProductInCart(id);

                            return (
                                <article key={id} className="product-card" data-aos="zoom-in">
                                    <figure className="category-product__wrapper">
                                        {sale > 0 && <span className="badge__sale">{`${sale}% OFF`}</span>}
                                        <div className="image-wrapper">
                                            <Link to={`/product/${slug}`}>
                                                <img src={thumbnail} alt={name} className="category__product-image" />
                                            </Link>
                                            <div className="product-actions" onClick={(e) => e.preventDefault()}>
                                                <button
                                                    className={`cart-btn ${loadingStates[id] ? "loading" : ""} ${
                                                        inCart ? "in-cart" : ""
                                                    }`}
                                                    title={inCart ? "Remove from cart" : "Add to cart"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCartAction(product);
                                                    }}
                                                    disabled={loadingStates[id]}
                                                >
                                                    {loadingStates[id] ? (
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
                                                    className="product-action-btn"
                                                    title="Add to wishlist"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <Heart size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </figure>
                                    <Link to={`/product/${slug}`}>
                                        <div className="category__product-details">
                                            <h3 className="category__product-name">{name}</h3>
                                            <p className="category__product-price">
                                                ${Math.round(salePrice)}
                                                {sale > 0 && (
                                                    <span className="category__product-price--old">
                                                        ${Math.round(originalPrice)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

import React from "react";
import "../../styles/bestSales.css"; // Import CSS Module
import productData from "../../data/product.json";
import { ShoppingCartIcon, Heart } from "lucide-react";
import { useCartActions } from "../../utils/handleCart";
import { useWishlistActions } from "../../utils/handleWishlist";

export default function BestSales() {
    const { handleCartAction, isProductInCart, loadingStates: cartLoadingStates } = useCartActions();
    const { handleWishlistAction, isProductInWishlist, loadingStates: wishlistLoadingStates } = useWishlistActions();
    // Sắp xếp sản phẩm theo salesCount giảm dần và lấy 6 sản phẩm đầu tiên
    const bestSellingProducts = productData.sort((a, b) => b.salesCount - a.salesCount).slice(0, 6);

    return (
        <section className="best-sales">
            <div className="container">
                <div className="section-top">
                    <h2 className="section-title">Best Sales</h2>
                    <p className="section-subtitle">
                        Discover our most popular school uniforms - trusted by parents and loved by students. These
                        best-selling items combine comfort, durability and style for the perfect school attire.
                    </p>
                </div>
                <div className="best-sales__grid">
                    {bestSellingProducts.map(({ id, name, price, sale, thumbnail }, index) => {
                        const inCart = isProductInCart(id);

                        return (
                            <article
                                key={id}
                                className="best-sales-item"
                                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                            >
                                <figure className="best-sales-item__image">
                                    {/* Hiển thị SALE nếu sản phẩm đang giảm giá */}
                                    {sale > 0 && <span className="badge__sale">SALE {sale}%</span>}
                                    <a href="#!">
                                        <img src={thumbnail} alt={name} width="100%" />
                                    </a>
                                </figure>
                                <div className="best-sales-item__info">
                                    <h3 className="best-sales-item__name">
                                        <a href="" className="best-sales-item__name">
                                            {name}
                                        </a>
                                    </h3>
                                    {/* Nút thêm vào giỏ hàng và yêu thích */}
                                    <div className="best-sales-item__actions">
                                        <button
                                            className={`cart-btn ${cartLoadingStates[id] ? "loading" : ""} ${
                                                inCart ? "in-cart" : ""
                                            }`}
                                            onClick={() => handleCartAction(productData.find((p) => p.id === id))}
                                            disabled={cartLoadingStates[id]}
                                        >
                                            {cartLoadingStates[id] ? (
                                                <img
                                                    src="/assets/icon/loading.gif"
                                                    alt="Loading..."
                                                    className="loading-spinner"
                                                />
                                            ) : (
                                                <ShoppingCartIcon className="best-sales-item__icon" />
                                            )}
                                        </button>
                                        <button
                                            className={`cart-btn ${wishlistLoadingStates[id] ? "loading" : ""} ${
                                                isProductInWishlist(id) ? "in-cart" : ""
                                            }`}
                                            onClick={() => handleWishlistAction(productData.find((p) => p.id === id))}
                                            disabled={wishlistLoadingStates[id]}
                                        >
                                            {wishlistLoadingStates[id] ? (
                                                <img
                                                    src="/assets/icon/loading.gif"
                                                    alt="Loading..."
                                                    className="loading-spinner"
                                                />
                                            ) : (
                                                <Heart className="best-sales-item__icon" />
                                            )}
                                        </button>
                                    </div>
                                    {/* Hiển thị giá và giá cũ nếu có giảm giá */}
                                    <p className="best-sales-item__price">
                                        ${price}
                                        {sale > 0 && (
                                            <span className="best-sales-item__price--old">
                                                ${Math.round(price * (1 + sale / 100))}
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
    );
}

import React from "react";
import "../../styles/bestSales.css"; // Import CSS Module
import bestSalesData from "../../data/best-sales.json";

export default function BestSales() {
    return (
        <section className="best-sales">
            <div className="container">
                <h2 className="section-title">Best Sales</h2>
                <p className="section-subtitle">Featured collection list best product</p>

                <div className="best-sales__grid">
                    {bestSalesData.map(({ id, name, price, discounted_price, image, sale }, index) => (
                        <article
                            key={id}
                            className="best-sales-item"
                            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                        >
                            <figure className="best-sales-item__image">
                                {/* Hiển thị SALE nếu sản phẩm đang giảm giá */}
                                {sale && <span className="badge__sale">SALE</span>}

                                <a href="#!">
                                    <img src={image} alt={name} width="100%" />
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
                                    <button className="best-sales-item__button">
                                        <img src="/assets/icon/plus.svg" alt="Add" className="best-sales-item__icon" />
                                    </button>
                                    <button className="best-sales-item__button">
                                        <img
                                            src="/assets/icon/favorite.svg"
                                            alt="Favorite"
                                            className="best-sales-item__icon"
                                        />
                                    </button>
                                </div>

                                {/* Hiển thị giá và giá cũ nếu có giảm giá */}
                                <p className="best-sales-item__price">
                                    {price}
                                    {sale && <span className="best-sales-item__price--old">{discounted_price}</span>}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

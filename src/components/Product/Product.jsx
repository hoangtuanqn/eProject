import React from "react";

export default function Product() {
    return (
        <>
            <section className="product">
                <div className="container">
                    <div className="product__grid">
                        <div className="product__images"></div>
                        <div className="product body">
                            <span className="product__breadcumb"></span>
                            <h2 className="product__title">Slim-Fit Formal Suit Blazer</h2>
                            <span className="product__price">13.594.000</span>
                            <span className="product__category">
                                <strong>Vendor</strong>: fashion
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

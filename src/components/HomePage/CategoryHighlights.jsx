import React from "react";
import "../../assets/css/categoryHighlights.css";

export default function CategoryHighlights() {
    return (
        <>
            {/* Category Highlights Section */}
            <section className="category-highlights">
                <div className="category-highlights__list" data-aos="flip-up">
                    <article className="category-highlights__item">
                        <div
                            className="category-highlights__background"
                            style={{ background: "url('./assets/imgs/banner-1.png') center/cover no-repeat" }}
                        ></div>
                        <div className="category-highlights__content">
                            <p className="category-highlights__subtitle">TOP COLLECTIONS</p>
                            <h2 className="category-highlights__title">Top Trends Style</h2>
                            <a href="#" className="category-highlights__link">
                                Shop Now
                            </a>
                        </div>
                    </article>

                    <article className="category-highlights__item">
                        <div
                            className="category-highlights__background"
                            style={{ background: "url('./assets/imgs/banner-2.png') center/cover no-repeat" }}
                        ></div>
                        <div className="category-highlights__content">
                            <p className="category-highlights__subtitle">PREMIUM STYLE</p>
                            <h2 className="category-highlights__title">Here Your Look</h2>
                            <a href="#" className="category-highlights__link">
                                Shop Now
                            </a>
                        </div>
                    </article>

                    <article className="category-highlights__item">
                        <div
                            className="category-highlights__background"
                            style={{ background: "url('./assets/imgs/banner-3.png') center/cover no-repeat" }}
                        ></div>
                        <div className="category-highlights__content">
                            <p className="category-highlights__subtitle">EXCLUSIVE SALE</p>
                            <h2 className="category-highlights__title">Up to 50% Off</h2>
                            <a href="#" className="category-highlights__link">
                                Shop Now
                            </a>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}

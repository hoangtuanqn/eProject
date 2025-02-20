import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import categoriesData from "~/data/categories.json";
export default function MenuDesktop() {
    const { pathname } = useLocation(); // lấy url hiện tại

    const isActive = (paths) => {
        // Kiểm tra xem pathname có match với bất kỳ path nào trong mảng không
        return paths.some((path) => pathname === path);
    };

    return (
        <nav className="hiddenMobile hiddenPClow">
            <ul className="header__nav dfbetween">
                <li className={pathname === "/" ? "active" : ""}>
                    <Link
                        to="/"
                        className="header__link"
                        onClick={() =>
                            // Nếu đang ở trang chủ thì kéo lên
                            // Không phải ở trang chủ thì quay về trang chủ
                            pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : ""
                        }
                    >
                        Home
                    </Link>
                </li>
                <li
                    className={clsx("header__nav-bigmenu", {
                        active: pathname.startsWith("/category") || pathname.startsWith("/product"),
                    })}
                >
                    <a href="#!" className="header__link">
                        Products
                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/icon/arrow-bottom.svg`} className="header__icon-arow" alt="" />
                    </a>
                </li>
                <div className="header__submenu header__submenu__big">
                    <div className="container">
                        <div className="header__submenu-row">
                            {/* Info left */}
                            <div className="header__submenu-left">
                                {/* Column 1 */}
                                <div className="submenu-col">
                                    <h2 className="submenu-title">School Uniforms</h2>
                                    <ul>
                                        <li>
                                            <Link to="/category/shirts" className="header__submenu-link">
                                                Shirts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/skirts" className="header__submenu-link">
                                                Skirts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/frocks" className="header__submenu-link">
                                                Frocks
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Trousers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Blazers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Winter Wear
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                School Bags
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Shoes
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Column 2 */}
                                <div className="submenu-col">
                                    <h2 className="submenu-title">Sport Uniforms</h2>
                                    <ul>
                                        <li>
                                            <Link to="/category/pttshirts" className="header__submenu-link">
                                                P.T T-shirts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/ptshorts" className="header__submenu-link">
                                                P.T. Shorts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/pttrackpants" className="header__submenu-link">
                                                P.T. track pants
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Sports Shoes
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Swimming Costumes
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Sports Equipment
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Team Jerseys
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Sports Bags
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Column 3 */}
                                <div className="submenu-col">
                                    <h2 className="submenu-title">Accessories</h2>
                                    <ul>
                                        <li>
                                            <Link to="/category/belts" className="header__submenu-link">
                                                Belts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/ties" className="header__submenu-link">
                                                Ties
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/logos" className="header__submenu-link">
                                                Logos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/socks" className="header__submenu-link">
                                                Socks
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Hair Accessories
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Badges
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Water Bottles
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Stationery
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Info right */}
                            <div className="header__submenu-right">
                                <figure>
                                    <Link to="/category/all-product" className="submenu__img-link">
                                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/imgs/ads-1.webp`} alt="" className="submenu__img" />
                                    </Link>

                                    <figcaption className="submenu__desc">Featured</figcaption>
                                </figure>
                                <figure>
                                    <Link to="/category/all-product" className="submenu__img-link">
                                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/imgs/ads-2.webp`} alt="" className="submenu__img" />
                                    </Link>
                                    <figcaption className="submenu__desc">New Arrivals</figcaption>
                                </figure>{" "}
                                <figure>
                                    <Link to="/category/all-product" className="submenu__img-link">
                                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/imgs/ads-3.webp`} alt="" className="submenu__img" />
                                    </Link>
                                    <figcaption className="submenu__desc">Special Offers</figcaption>
                                </figure>{" "}
                                <figure>
                                    <Link to="/category/all-product" className="submenu__img-link">
                                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/imgs/ads-4.webp`} alt="" className="submenu__img" />
                                    </Link>
                                    <figcaption className="submenu__desc">All Products</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
                <li
                    className={
                        isActive([
                            "/pages/about",
                            "/pages/careers",
                            "/pages/partners",
                            "/pages/customer-growth-chart",
                            "/pages/awards",
                        ])
                            ? "active"
                            : ""
                    }
                >
                    <a href="#!" className="header__link">
                        About
                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/icon/arrow-bottom.svg`} className="header__icon-arow" alt="" />
                    </a>
                    {/* Submenu */}
                    <ul className="header__submenu">
                        <li>
                            <Link to="/pages/about" className="header__submenu-link">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/careers" className="header__submenu-link">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/partners" className="header__submenu-link">
                                Partners
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/customer-growth-chart" className="header__submenu-link">
                                Growth & Achievement
                            </Link>
                        </li>

                        <li>
                            <Link to="/pages/awards" className="header__submenu-link">
                                Awards & Recognition
                            </Link>
                        </li>
                    </ul>
                </li>
                <li
                    className={
                        isActive([
                            "/pages/faq",
                            "/pages/policies",
                            "/pages/contact",
                            "/pages/order-tracking",
                            "/pages/size-guide",
                            "/pages/sitemap",
                        ])
                            ? "active"
                            : ""
                    }
                >
                    <a href="#!" className="header__link">
                        Support
                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/icon/arrow-bottom.svg`} className="header__icon-arow" alt="" />
                    </a>
                    {/* Submenu */}
                    <ul className="header__submenu">
                        <li>
                            <Link to="/pages/faq" className="header__submenu-link">
                                <span>FAQ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/policies" className="header__submenu-link">
                                Policies
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/contact" className="header__submenu-link">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/order-tracking" className="header__submenu-link">
                                Order Tracking
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/size-guide" className="header__submenu-link">
                                Size Guide
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/sitemap" className="header__submenu-link">
                                Sitemap
                            </Link>
                        </li>
                    </ul>
                </li>
                <li
                    className={
                        isActive([
                            "/pages/gallery/product-photos",
                            "/pages/gallery/school-events",
                            "/pages/gallery/sports-events",
                            "/blog/news",
                        ])
                            ? "active"
                            : ""
                    }
                >
                    <a href="#!" className="header__link">
                        Media
                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/icon/arrow-bottom.svg`} className="header__icon-arow" alt="" />
                    </a>
                    {/* Submenu */}
                    <ul className="header__submenu">
                        <li>
                            <Link to="/pages/gallery/product-photos" className="header__submenu-link">
                                <span>Gallery</span>
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/assets/icon/cheveron-right.svg`}
                                    className="header__submenu__icon-arow"
                                    alt=""
                                />
                            </Link>
                            <ul className="header__submenu2">
                                <li>
                                    <Link to="/pages/gallery/product-photos" className="header__submenu-link">
                                        Product Photos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pages/gallery/school-events" className="header__submenu-link">
                                        School Events
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pages/gallery/sports-events" className="header__submenu-link">
                                        Sports Events
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/blog/news" className="header__submenu-link">
                                News
                            </Link>
                        </li>
                        <li>
                            <a href="#!" className="header__submenu-link">
                                Fashion News
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="header__submenu-link">
                                <span>Trends</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li
                    className={
                        isActive(["/pages/wishlist", "/pages/coupons", "/pages/recently-products"]) ? "active" : ""
                    }
                >
                    <a href="#!" className="header__link">
                        Activities
                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/icon/arrow-bottom.svg`} className="header__icon-arow" alt="" />
                    </a>
                    {/* Submenu */}
                    <ul className="header__submenu">
                        <li>
                            <Link to="/pages/wishlist" className="header__submenu-link">
                                <span>Wishlist</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/coupons" className="header__submenu-link">
                                <span>Coupons</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/recently-products" className="header__submenu-link">
                                <span>Recently Products</span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

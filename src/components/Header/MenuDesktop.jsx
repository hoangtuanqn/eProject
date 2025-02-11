import React from "react";
import { Link, useLocation } from "react-router-dom";
import categoriesData from "../../data/categories.json";
import { ChevronDown } from "lucide-react";
export default function MenuDesktop() {
    const { pathname } = useLocation(); // lấy url hiện tại
    return (
        <nav className="hiddenMobile hiddenPClow">
            <ul className="header__nav dfbetween">
                <li>
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
                <li>
                    <a href="#!" className="header__link">
                        Shop
                        <img src="/assets/icon/arrow-bottom.svg" className="header__icon-arow" alt="" />
                    </a>
                    {/* Submenu Big */}
                    <div className="header__submenu header__submenu__big">
                        <div className="container">
                            <div className="header__submenu-row">
                                {/* Info left */}
                                <div className="header__submenu-left">
                                    {/* Column 1 */}
                                    <div className="submenu-col">
                                        <h2 className="submenu-title">Instruments</h2>
                                        <ul>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Cotton Full shirt
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Resin Strap
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Boheme Rose Gold
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    hat craft
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Oxford Shoes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Nail Grinder
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Column 2 */}
                                    <div className="submenu-col">
                                        <h2 className="submenu-title">Product</h2>

                                        <ul>
                                            {categoriesData.map((item) => {
                                                return (
                                                    <li key={item.id}>
                                                        <Link
                                                            to={`/category/${item.slug}`}
                                                            className="header__submenu-link"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    {/* Column 3 */}
                                    <div className="submenu-col">
                                        <h2 className="submenu-title">Accessories</h2>

                                        <ul>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Rabbit
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Cattery Cages
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Leather
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Fit Tee print
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Kong T-shirt
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!" className="header__submenu-link">
                                                    Show winter dress
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Info right */}
                                <div className="header__submenu-right">
                                    <figure>
                                        <a href="#!">
                                            <img src="/assets/imgs/bag-1.jpg" alt="" className="submenu__img" />
                                        </a>

                                        <figcaption className="submenu__desc">Featured</figcaption>
                                    </figure>
                                    <figure>
                                        <a href="#!">
                                            <img src="/assets/imgs/bag-2.jpg" alt="" className="submenu__img" />
                                        </a>
                                        <figcaption className="submenu__desc">New Arrivals</figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#!" className="header__link">
                        Pages
                        <img src="/assets/icon/arrow-bottom.svg" className="header__icon-arow" alt="" />
                        {/* <ChevronDown size={20} /> */}
                    </a>
                    {/* Submenu */}
                    <ul className="header__submenu">
                        <li>
                            <Link to="/pages/about" className="header__submenu-link">
                                About Us
                            </Link>
                        </li>
                        {/* <li>
                                            <Link to="/pages/team" className="header__submenu-link">
                                                About Team
                                            </Link>
                                        </li> */}
                        <li>
                            <Link to="/pages/faq" className="header__submenu-link">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/gallery" className="header__submenu-link">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/partners" className="header__submenu-link">
                                Partners
                            </Link>
                        </li>
                        {/* <li>
                            <a href="#!" className="header__submenu-link">
                                Compare
                            </a>
                        </li> */}
                        <li>
                            <Link to="/pages/wishlist" className="header__submenu-link">
                                Wishlist
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories" className="header__submenu-link">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/policies" className="header__submenu-link">
                                Shipping & Returns Policy
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#!" className="header__link">
                        Blog
                        <img src="/assets/icon/arrow-bottom.svg" className="header__icon-arow" alt="" />
                    </a>
                    {/* Submenu */}
                    <ul className="header__submenu">
                        <li>
                            <a href="#!" className="header__submenu-link">
                                Blog Detail
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/pages/contact" className="header__link">
                        Contact Us
                        {/* <img src="/assets/icon/arrow-bottom.svg" className="header__icon-arow" alt="" /> */}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

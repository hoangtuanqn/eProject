import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import categoriesData from "~/data/categories.json";

const MenuMobile = ({ toggleSubmenu }) => {
    const { pathname } = useLocation();

    const handleSubmenuClick = (e) => {
        const menu = document.querySelector(".mobile-menu");
        menu.classList.add("closing");
        setTimeout(() => {
            menu.classList.remove("active", "closing");
            document.body.style.overflow = "";
        }, 500);
    };

    useEffect(() => {
        handleSubmenuClick();
    }, [pathname]);

    return (
        <div className="mobile-menu">
            <div className="mobile-menu__overlay"></div>

            <div className="mobile-menu__content">
                <div className="mobile-menu__header">
                    <h2 className="mobile-menu__title">Maverick Dresses</h2>
                    {/* Button close Menu */}
                    <button className="mobile-menu__close" aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="mobile-menu__nav">
                    <ul className="mobile-menu__list">
                        <li className="mobile-menu__item">
                            <Link
                                to="/"
                                className="mobile-menu__link"
                                onClick={() => {
                                    pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                            >
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="mobile-menu__item">
                            <button className="mobile-menu__link" data-submenu="shop" onClick={(e) => toggleSubmenu(e)}>
                                <span>Shop</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 1v10M1 6h10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <ul className="mobile-submenu">
                                <li>
                                    <button className="mobile-submenu__link" onClick={(e) => toggleSubmenu(e)}>
                                        <span>School Uniforms</span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 1v10M1 6h10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <ul className="mobile-submenu__child">
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Shirts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Skirts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Frocks
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Trousers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Blazers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Winter Wear
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                School Bags
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Shoes
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button className="mobile-submenu__link" onClick={(e) => toggleSubmenu(e)}>
                                        <span>Sport Uniforms</span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 1v10M1 6h10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <ul className="mobile-submenu__child">
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                P.T T-shirts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                P.T. Shorts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                P.T. track pants
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Sports Shoes
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Swimming Costumes
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Sports Equipment
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Team Jerseys
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Sports Bags
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button className="mobile-submenu__link" onClick={(e) => toggleSubmenu(e)}>
                                        <span>Accessories</span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 1v10M1 6h10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <ul className="mobile-submenu__child">
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Belts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Ties
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Logos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Socks
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Hair Accessories
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Badges
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Water Bottles
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Stationery
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="mobile-menu__item">
                            <button
                                className="mobile-menu__link"
                                data-submenu="pages"
                                onClick={(e) => toggleSubmenu(e)}
                            >
                                <span>Pages</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 1v10M1 6h10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <ul className="mobile-submenu">
                                <li>
                                    <Link to="/pages/about" className="mobile-submenu__link">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <button className="mobile-submenu__link" onClick={(e) => toggleSubmenu(e)}>
                                        <span>Careers</span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 1v10M1 6h10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <ul className="mobile-submenu__child">
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Job Openings
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Internships
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Work Culture
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button className="mobile-submenu__link" onClick={(e) => toggleSubmenu(e)}>
                                        <span>Partners</span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 1v10M1 6h10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <ul className="mobile-submenu__child">
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Schools
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Suppliers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="mobile-submenu__link">
                                                Distributors
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#!" className="mobile-submenu__link">
                                        Our History
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="mobile-submenu__link">
                                        Awards & Recognition
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mobile-menu__item">
                            <button className="mobile-menu__link" data-submenu="blog" onClick={(e) => toggleSubmenu(e)}>
                                <span>Blog</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 1v10M1 6h10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <ul className="mobile-submenu">
                                <li>
                                    <a href="#!" className="mobile-submenu__link">
                                        Blog Detail
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mobile-menu__item">
                            <Link to="/pages/contact" className="mobile-menu__link">
                                <span>Contact Us</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <a href="#!" className="mobile-menu__login">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.667 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H6.667a3.333 3.333 0 00-3.334 3.333V17.5M10 9.167A3.333 3.333 0 1010 2.5a3.333 3.333 0 000 6.667z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Log in
                </a>
            </div>
        </div>
    );
};

export default MenuMobile;

import React, { useEffect, useRef } from "react";
import "../../assets/css/header.css";
// CSS Search header
import "../../assets/css/headerSearch.css";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
    const mobileMenuRef = useRef(null);
    const searchRef = useRef(null);
    const { pathname } = useLocation(); // lấy url hiện tại

    // Hàm mở menu
    const openMenu = (target) => {
        if (target.current) {
            target.current.classList.add("active");
            document.body.style.overflow = "hidden"; // Ngăn cuộn trang khi menu mở
        }
    };

    // Hàm đóng menu với animation
    const closeMenuWithAnimation = () => {
        if (mobileMenuRef.current) {
            mobileMenuRef.current.classList.add("closing");
            setTimeout(() => {
                if (mobileMenuRef.current) {
                    mobileMenuRef.current.classList.remove("active", "closing");
                    document.body.style.overflow = ""; // Cho phép cuộn trang lại
                }
            }, 500); // Phù hợp với thời gian animation đóng menu
        }
    };

    // Đóng Search
    const closeSearchWithAnimation = () => {
        if (searchRef.current) {
            searchRef.current.classList.add("closing");
            setTimeout(() => {
                if (searchRef.current) {
                    searchRef.current.classList.remove("active", "closing");
                    document.body.style.overflow = ""; // Cho phép cuộn trang lại
                }
            }, 500); // Phù hợp với thời gian animation đóng menu
        }
    };

    // Hàm xử lý submenu
    const toggleSubmenu = (e) => {
        e.preventDefault();
        const menuItem = e.currentTarget.closest(".mobile-menu__item");
        if (!menuItem) return;

        // Kiểm tra trạng thái hiện tại của submenu
        const isActive = menuItem.classList.contains("active");

        // Đóng tất cả các submenu khác
        document.querySelectorAll(".mobile-menu__item.active").forEach((item) => {
            item.classList.remove("active");
        });

        // Nếu submenu chưa mở thì mở nó
        if (!isActive) {
            menuItem.classList.add("active");
        }
    };

    useEffect(() => {
        // Xử lý sự kiện đóng menu khi nhấp vào overlay
        const handleClickOutside = (e) => {
            if (mobileMenuRef.current && e.target === mobileMenuRef.current) {
                closeMenuWithAnimation();
            }
        };

        // Search
        const handleSearchOutside = (e) => {
            if (searchRef.current && e.target === searchRef.current) {
                closeSearchWithAnimation();
            }
        };
        document.addEventListener("click", handleClickOutside); // menu
        document.addEventListener("click", handleSearchOutside); // search

        // Xử lý khi bấm vô Search menu
        return () => {
            document.removeEventListener("click", handleClickOutside); // menu
            document.removeEventListener("click", handleSearchOutside); // search
        };
    }, []);
    return (
        <>
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header__inner dfbetween">
                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="mobile-menu-toggle"
                            aria-label="Toggle menu"
                            onClick={() => openMenu(mobileMenuRef)}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 12H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 6H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 18H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hiddenMobile">
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
                                                            <li>
                                                                <a href="#!" className="header__submenu-link">
                                                                    T-shirt
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#!" className="header__submenu-link">
                                                                    Rainbow T-shirt
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#!" className="header__submenu-link">
                                                                    Waist denim
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#!" className="header__submenu-link">
                                                                    Slim fit formal
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#!" className="header__submenu-link">
                                                                    Warm fit dress
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#!" className="header__submenu-link">
                                                                    Rx line
                                                                </a>
                                                            </li>
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
                                                            <img
                                                                src="/assets/imgs/bag-1.jpg"
                                                                alt=""
                                                                className="submenu__img"
                                                            />
                                                        </a>

                                                        <figcaption className="submenu__desc">Featured</figcaption>
                                                    </figure>
                                                    <figure>
                                                        <a href="#!">
                                                            <img
                                                                src="/assets/imgs/bag-2.jpg"
                                                                alt=""
                                                                className="submenu__img"
                                                            />
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
                                    </a>
                                    {/* Submenu */}
                                    <ul className="header__submenu">
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Team
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                FAQ
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Compare
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Wishlist
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Collections
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="header__submenu-link">
                                                Shipping Policy
                                            </a>
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
                                    <a href="#!" className="header__link">
                                        Contact
                                        {/* <img src="/assets/icon/arrow-bottom.svg" className="header__icon-arow" alt="" /> */}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <img src="/assets/imgs/logo.png" alt="Maverick Dresses" className="header__logo" />

                        <div className="dfbetween">
                            <button className="header__icon-wrap dfbetween" onClick={() => openMenu(searchRef)}>
                                <img src="/assets/icon/search.svg" alt="" className="header__icon" />
                            </button>
                            <button className="header__icon-wrap dfbetween hiddenMobile">
                                <img src="/assets/icon/tym.svg" alt="" className="header__icon" />
                            </button>
                            <button className="header__icon-wrap dfbetween">
                                <img src="/assets/icon/cart.svg" alt="" className="header__icon" />
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        <div className="mobile-menu" ref={mobileMenuRef}>
                            <div className="mobile-menu__overlay" onClick={closeMenuWithAnimation}></div>
                            <div className="mobile-menu__content">
                                <div className="mobile-menu__header">
                                    <h2 className="mobile-menu__title">Maverick Dresses</h2>
                                    {/* Button close Menu */}
                                    <button
                                        className="mobile-menu__close"
                                        aria-label="Close menu"
                                        onClick={closeMenuWithAnimation}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
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
                                            <a href="#!">
                                                <button className="mobile-menu__link" data-submenu="home">
                                                    <span>Home</span>
                                                </button>
                                            </a>
                                        </li>
                                        <li className="mobile-menu__item">
                                            <button
                                                className="mobile-menu__link"
                                                data-submenu="shop"
                                                onClick={toggleSubmenu}
                                            >
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
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop Grid
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="mobile-submenu__link">
                                                        Shop Categories
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        {/* Similar structure for Pages, Blog */}
                                        <li className="mobile-menu__item">
                                            <button className="mobile-menu__link">Contact</button>
                                        </li>
                                    </ul>
                                </nav>
                                <a href="#" className="mobile-menu__login">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
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

                        {/* Search */}
                        <div className="search" ref={searchRef}>
                            <div className="search__content">
                                <form action="">
                                    <div className="search__group-input">
                                        <input
                                            type="text"
                                            name=""
                                            className="search__input"
                                            placeholder="Search our store"
                                        />
                                        <button type="button" className="search__button">
                                            <svg
                                                className="icon icon-search"
                                                aria-hidden="true"
                                                focusable="false"
                                                role="presentation"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0.833313 9.16659C0.833313 4.56421 4.56427 0.833252 9.16665 0.833252C13.769 0.833252 17.5 4.56421 17.5 9.16659C17.5 11.1677 16.7946 13.004 15.6191 14.4405L19.1666 17.9881L17.9881 19.1666L14.4406 15.619C13.0041 16.7946 11.1677 17.4999 9.16665 17.4999C4.56427 17.4999 0.833313 13.7689 0.833313 9.16659ZM9.16665 2.49992C5.48475 2.49992 2.49998 5.48469 2.49998 9.16659C2.49998 12.8485 5.48475 15.8333 9.16665 15.8333C12.8486 15.8333 15.8333 12.8485 15.8333 9.16659C15.8333 5.48469 12.8486 2.49992 9.16665 2.49992Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Tái sử dụng lại class "mobile-menu__close" của menu  */}
                                    <button
                                        type="button"
                                        className="mobile-menu__close"
                                        aria-label="Close menu"
                                        onClick={closeSearchWithAnimation}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18 6L6 18M6 6l12 12"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            ></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

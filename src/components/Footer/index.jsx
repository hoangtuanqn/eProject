import React, { useEffect } from "react";
import "../../styles/footer.css";
import Newsletter from "./Newsletter";
import { initTicker } from "./ticker";

export default function Footer() {
    useEffect(() => {
        initTicker();
    }, []);
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        {/* Contact Info */}
                        <div className="footer__column">
                            <h3 className="footer__heading">Contact Info</h3>
                            <address className="footer__address">
                                70 Washington Square South, New York, NY 10012, United States
                            </address>
                            <a href="mailto:support@maverickdresses.com" className="footer__link">
                                Email: support@maverickdresses.com
                            </a>
                            <a href="tel:0812665001" className="footer__link">
                                {" "}
                                Phone: 0812.665.001{" "}
                            </a>
                        </div>

                        {/* Our Store */}
                        <div className="footer__column">
                            <h3 className="footer__heading">Our Store</h3>
                            <ul className="footer__list">
                                <li>
                                    <a href="#!" className="footer__link">
                                        Full Grooming
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="footer__link">
                                        Bath and Dry
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="footer__link">
                                        Styling
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="footer__link">
                                        Medical Bath
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Useful Links */}
                        <div className="footer__column">
                            <h3 className="footer__heading">Useful Links</h3>
                            <ul className="footer__list">
                                <li>
                                    <a href="#!" className="footer__link">
                                        Login
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="footer__link">
                                        My account
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="footer__link">
                                        Wishlist
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="footer__link">
                                        Checkout
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <Newsletter />
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer__bottom">
                        <p className="footer__copyright">&copy; 2025, Team 02 FPT APTECH</p>
                        <div className="footer__payment">
                            <img src="/assets/icon/visa.svg" alt="Visa" className="footer__payment-img" />
                            <img src="/assets/icon/mastercard.svg" alt="Mastercard" className="footer__payment-img" />
                            <img src="/assets/icon/amex.svg" alt="American Express" className="footer__payment-img" />
                            <img src="/assets/icon/paypal.svg" alt="PayPal" className="footer__payment-img" />
                            <img src="/assets/icon/diners.svg" alt="Diners Club" className="dinersclub-img" />
                            <img src="/assets/icon/discover.svg" alt="Discover" className="footer__payment-img" />
                        </div>
                    </div>
                </div>
                {/* Ticker */}
                <div className="footer__ticker-container">
                    <div className="footer__ticker">
                        <span id="dateTime"></span>
                        <span id="location"></span>
                    </div>
                </div>
                {/* Scoll top button */}
                <button className="scrollToTopBtn" id="scrollToTopBtn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4l-8 8h5v8h6v-8h5z" />
                    </svg>
                </button>
            </footer>
        </>
    );
}

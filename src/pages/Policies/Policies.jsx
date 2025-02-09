import React from "react";
import "../../styles/policies.css";
import { Link } from "react-router-dom";

export default function Policies() {
    return (
        <section className="policies">
            <div className="container">
                <div className="policies__wrapper">
                    {/* <h1 className="policies__title">Our Policies</h1> */}

                    <div className="policies__content">
                        <div className="policies__section">
                            <h2 className="policies__section-title">Returns & Refunds</h2>
                            <div className="policies__text">
                                <p>
                                    At <span className="policies__highlight">{process.env.REACT_APP_BRAND_NAME}</span>,
                                    we stand behind the quality of our products and want you to be completely satisfied
                                    with your purchase.
                                </p>

                                <h3>Return Policy Overview</h3>
                                <ul>
                                    <li>You have 30 days from the date of delivery to initiate a return.</li>
                                    <li>
                                        Items must be unused, unworn, and in the same condition that you received them.
                                    </li>
                                    <li>All original packaging, tags, and accessories must be included.</li>
                                    <li>You must provide proof of purchase (order number or receipt).</li>
                                </ul>

                                <div className="policies__quote">
                                    We strive to make the return process as simple and straightforward as possible.
                                </div>

                                <h3>How to Initiate a Return</h3>
                                <ol>
                                    <li>Log into your account and go to your order history.</li>
                                    <li>Select the item(s) you wish to return and provide a reason.</li>
                                    <li>Print the prepaid return shipping label.</li>
                                    <li>Pack the item securely and attach the shipping label.</li>
                                    <li>Drop off the package at your nearest post office or schedule a pickup.</li>
                                </ol>

                                <p>
                                    Once we receive and inspect the returned item, we will process your refund. Please
                                    allow 5-10 business days for the refund to appear on your original payment method.
                                </p>

                                {/* <a href="#" className="policies__button">
                                    Initiate a Return
                                </a> */}
                            </div>
                        </div>

                        <div className="policies__section">
                            <h2 className="policies__section-title">Privacy Policy</h2>
                            <div className="policies__text">
                                <p>
                                    Your privacy is important to us at{" "}
                                    <span className="policies__highlight">{process.env.REACT_APP_BRAND_NAME}</span>.
                                    This Privacy Policy outlines how we collect, use, and protect your personal
                                    information.
                                </p>

                                <h3>Information We Collect</h3>
                                <ul>
                                    <li>
                                        Personal identification information (Name, email address, phone number, etc.)
                                    </li>
                                    <li>Billing and shipping address</li>
                                    <li>Payment information (credit card numbers, PayPal email, etc.)</li>
                                    <li>Browsing history and shopping preferences</li>
                                </ul>

                                <h3>How We Use Your Information</h3>
                                <ul>
                                    <li>To process and fulfill your orders</li>
                                    <li>To communicate with you about your orders and provide customer support</li>
                                    <li>To personalize your shopping experience and improve our services</li>
                                    <li>To send you marketing communications (with your consent)</li>
                                </ul>

                                <div className="policies__quote">
                                    We are committed to protecting your personal information and will never sell it to
                                    third parties.
                                </div>

                                <h3>Your Rights</h3>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>Access and receive a copy of your personal data</li>
                                    <li>Request the correction of inaccurate personal data</li>
                                    <li>Request the deletion of your personal data</li>
                                    <li>Object to the processing of your personal data</li>
                                    <li>Request the restriction of processing your personal data</li>
                                </ul>

                                <p>
                                    If you have any questions about our Privacy Policy or wish to exercise your rights,
                                    please contact our Data Protection Officer at{" "}
                                    <a href="mailto:{process.env.REACT_APP_BRAND_EMAIL}" className="policies__highlight">
                                        {process.env.REACT_APP_BRAND_EMAIL}
                                    </a>
                                    .
                                </p>


                                <Link to="/pages/contact" className="policies__button">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="policies__summary">
                        <h3 className="policies__summary-title">Policy Highlights</h3>
                        <ul className="policies__summary-list">
                            <li className="policies__summary-item">30-day return window for all purchases</li>
                            <li className="policies__summary-item">Free returns on all domestic orders</li>
                            <li className="policies__summary-item">Secure payment processing</li>
                            <li className="policies__summary-item">Personal data protection and privacy</li>
                            <li className="policies__summary-item">
                                No sharing of customer information with third parties
                            </li>
                            <li className="policies__summary-item">
                                Right to access, modify, or delete your personal data
                            </li>
                            <li className="policies__summary-item">Transparent communication about policy changes</li>
                            <li className="policies__summary-item">
                                Dedicated customer support for policy-related inquiries
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

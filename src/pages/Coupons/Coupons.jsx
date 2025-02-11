import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import coupons from "~/data/coupons.json";
import "~/styles/coupons.css";
import toast from "react-hot-toast";

const CouponPage = () => {
    const [copiedCode, setCopiedCode] = useState(null);

    const copyToClipboard = (code) => {
        try {
            navigator.clipboard.writeText(code);
            setCopiedCode(code);
            toast.success("Copied to clipboard");
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (error) {
            toast.error("Failed to copy to clipboard");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <section className="coupon-page">
            <div className="container">
                <motion.h1
                    className="coupon-page__title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Special Offers Just For You
                </motion.h1>
                <div className="coupon-page__grid">
                    <AnimatePresence>
                        {coupons
                            .filter((coupon) => coupon.visible)
                            .map((coupon, index) => (
                                <motion.div
                                    key={coupon.code}
                                    className="coupon-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="coupon-card__label">SAVE {coupon.discount}%</div>
                                    <div className="coupon-card__content">
                                        <div className="coupon-card__header">
                                            <h2 className="coupon-card__discount">{coupon.discount}% OFF</h2>
                                            <div className="coupon-card__expiry">
                                                Expires: {formatDate(coupon.expiry_date)}
                                            </div>
                                        </div>
                                        <div className="coupon-card__details">
                                            <p className="coupon-card__min-purchase">
                                                Min. Purchase: ${coupon.min_purchase}
                                            </p>
                                            {coupon.valid_categories.length > 0 && (
                                                <div className="coupon-card__categories">
                                                    <p className="coupon-card__categories-title">Valid for:</p>
                                                    {coupon.valid_categories.map((category, idx) => (
                                                        <span key={idx} className="coupon-card__category">
                                                            {category}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="coupon-card__code">
                                        <div className="coupon-card__code-container">
                                            <span className="coupon-card__code-text">{coupon.code}</span>
                                            <button
                                                className="coupon-card__copy"
                                                onClick={() => copyToClipboard(coupon.code)}
                                            >
                                                {copiedCode === coupon.code ? (
                                                    <>
                                                        <Check className="coupon-card__icon" />
                                                        <span className="coupon-card__copy-text">Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="coupon-card__icon" />
                                                        <span className="coupon-card__copy-text">Copy Code</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
export default memo(CouponPage);

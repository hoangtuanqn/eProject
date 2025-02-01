import { useState } from "react";
import { motion } from "framer-motion";
import "../../assets/css/partners.css";
import { Link } from "react-router-dom";

const partners = [
    { id: 1, name: "Partner 1", logo: "/assets/imgs/brand-logo-1.webp" },
    { id: 2, name: "Partner 2", logo: "/assets/imgs/brand-logo-2.webp" },
    { id: 3, name: "Partner 3", logo: "/assets/imgs/brand-logo-3.webp" },
    { id: 4, name: "Partner 4", logo: "/assets/imgs/brand-logo-4.webp" },
    { id: 5, name: "Partner 5", logo: "/assets/imgs/brand-logo-5.webp" },
    { id: 6, name: "Partner 6", logo: "/assets/imgs/brand-logo-6.webp" },
];

export default function Partners() {
    const [hoveredPartner, setHoveredPartner] = useState(null);

    return (
        <section className="partners">
            <div className="container">
                <header className="partners__header">
                    <motion.h1
                        className="partners__title"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Collaborative Partners
                    </motion.h1>
                    <motion.p
                        className="partners__subtitle"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        We partner with leading schools, manufacturers, and suppliers to deliver high-quality school
                        uniforms that meet the needs of students and educators alike. Together, we strive to create
                        uniforms that inspire pride, comfort, and confidence.
                    </motion.p>
                </header>
                <motion.div
                    className="partners__grid"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.id}
                            className="partners__item"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={() => setHoveredPartner(partner.id)}
                            onHoverEnd={() => setHoveredPartner(null)}
                        >
                            <img
                                src={partner.logo || "/placeholder.svg"}
                                alt={partner.name}
                                className="partners__logo"
                            />
                            {hoveredPartner === partner.id && (
                                <motion.div
                                    className="partners__info"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <h3>{partner.name}</h3>
                                    <p>Trusted partner since 2020</p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div
                    className="partners__cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h2>Interested in becoming a partner?</h2>
                    <p>Join our network of industry-leading companies and grow your business with us.</p>
                    <Link to="/pages/contact">
                        <motion.button
                            className="partners__cta-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Apply Now
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

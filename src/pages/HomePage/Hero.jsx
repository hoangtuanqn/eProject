import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "~/styles/hero.css";

export default function Hero() {
    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div
                    className="hero__bg"
                    style={{
                        background: "url('/assets/imgs/hero-image-lg-3.png') top center / cover no-repeat",
                    }}
                ></div>

                <div className="container">
                    <div className="hero__inner">
                        <motion.h1
                            className="hero__heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Quality School Uniforms for Every Season
                        </motion.h1>

                        <motion.p
                            className="hero__desc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Tell your story through meaningful school uniforms
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/categories" className="btn hero__btn">
                                Shop Now
                                <ArrowUpRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

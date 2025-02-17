import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "~/styles/hero.css";

export default function Hero() {
    const slides = [
        {
            image: "/assets/imgs/hero-image-lg-3.png",
            title: "Quality School Uniforms for Every Season",
            description: "Tell your story through meaningful school uniforms",
        },
        {
            image: "/assets/imgs/hero-image-lg-3.png",
            title: "Discover Our New Collection",
            description: "Stylish and comfortable uniforms for students",
        },
        {
            image: "/assets/imgs/hero-image-lg-3.png",
            title: "Premium Quality Materials",
            description: "Designed to last throughout the school year",
        },
    ];

    return (
        <section className="hero">
            <Carousel
                showArrows={true}
                useKeyboardArrows={true}
                autoFocus={true}
                infiniteLoop={true}
                emulateTouch={true}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="hero-slide">
                        <div
                            className="hero__bg"
                            style={{
                                background: `url('${slide.image}') top center / cover no-repeat`,
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
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    className="hero__desc"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {slide.description}
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
                    </div>
                ))}
            </Carousel>
        </section>
    );
}

"use client";

import { Check, Truck, Gift, Crown, ArrowRight } from "lucide-react";
import "../../assets/css/aboutUs.css";
import Team from "../Team/Team"; // Không trỏ vào file index vì nó có BreadCumb
import { Link } from "react-router-dom";

const features = [
    { id: 1, text: "Latest Technology" },
    { id: 2, text: "Quick Servicing" },
    { id: 3, text: "Best R&D Team" },
    { id: 4, text: "Expert Team" },
];

const benefits = [
    {
        id: 1,
        icon: <Truck className="about-us__benefit-icon" />,
        title: "FREE SHIPPING",
        description: "On all orders over $75.00",
    },
    {
        id: 2,
        icon: <Gift className="about-us__benefit-icon" />,
        title: "FREE SHIPPING",
        description: "On all orders over $75.00",
    },
    {
        id: 3,
        icon: <Crown className="about-us__benefit-icon" />,
        title: "MONEY BACK",
        description: "30 days money back guarantee",
    },
];

export default function AboutUs() {
    return (
        <>
            <section className="about-us">
                <div className="container">
                    {/* Hero Section */}
                    <div className="about-us__hero">
                        <div className="about-us__hero-image">
                            <img
                                src="/assets/imgs/about-1.webp"
                                alt="Team working together"
                                className="about-us__image"
                            />
                            <div className="about-us__image-overlay"></div>
                        </div>
                        <div className="about-us__hero-content">
                            <h1 className="about-us__title">Our Dream is to be a Global Fashion Brand</h1>
                            <p className="about-us__description">
                                At <strong>Maverick Dresses</strong>, we specialize in providing high-quality school
                                uniforms that combine comfort, durability, and style. Our mission is to create uniforms
                                that inspire pride and unity among students, while meeting the practical needs of
                                everyday school life. We believe that every student deserves to feel confident and
                                comfortable in their uniform. That’s why we focus on premium materials, thoughtful
                                designs, and exceptional customer service to ensure the best experience for schools and
                                families. Join us in making school uniforms a symbol of pride and belonging for every
                                student.
                            </p>
                            <div className="about-us__features">
                                {features.map((feature) => (
                                    <div key={feature.id} className="about-us__feature">
                                        <Check className="about-us__feature-icon" />
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/categories">
                                <button className="about-us__cta">
                                    Shop Now
                                    <ArrowRight className="about-us__cta-icon" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="about-us__benefits">
                        {benefits.map((benefit) => (
                            <div key={benefit.id} className="about-us__benefit">
                                {benefit.icon}
                                <h3 className="about-us__benefit-title">{benefit.title}</h3>
                                <p className="about-us__benefit-description">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Story Section */}
                    <div className="about-us__story">
                        <div className="about-us__story-content">
                            <h2 className="about-us__story-title">Our Story and How We Grew</h2>
                            <p className="about-us__story-text">
                                At <strong>Maverick Dresses</strong>, our journey began with a simple goal: to provide
                                high-quality school uniforms that inspire pride and unity among students. Over the
                                years, we have grown into a trusted name in the industry, thanks to our commitment to
                                quality, innovation, and customer satisfaction.
                            </p>

                            <div className="about-us__story-section">
                                <h3 className="about-us__story-subtitle">Our Mission</h3>
                                <p className="about-us__story-text">
                                    Our mission is to create school uniforms that are not only stylish and comfortable
                                    but also durable and functional. We aim to support schools and families by offering
                                    uniforms that reflect the values and traditions of their institutions while meeting
                                    the practical needs of everyday school life.
                                </p>
                            </div>

                            <div className="about-us__story-section">
                                <h3 className="about-us__story-subtitle">Our Vision</h3>
                                <p className="about-us__story-text">
                                    We envision a future where every student feels confident and proud in their uniform.
                                    By continuously improving our designs and services, we strive to be the leading
                                    provider of school uniforms, helping to foster a sense of belonging and identity in
                                    students everywhere.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__story-image">
                            <img
                                src="https://i.guim.co.uk/img/media/7646b385648a1f76490aef08b1b516a92f825f2c/0_146_4000_2400/master/4000.jpg?width=1200&quality=85&auto=format&fit=max&s=e837d2328e13e58caeebf79e332794a7"
                                alt="Fashion models"
                                className="about-us__image"
                            />
                            <div className="about-us__image-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>

            <Team />
        </>
    );
}

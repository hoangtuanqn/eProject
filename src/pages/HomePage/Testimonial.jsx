import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../../styles/testimonial.css"; // Import CSS Module

import testimonials from "../../data/testimonials.json"; // Import file JSON

export default function Testimonial() {
    // Hàm render sao dựa trên số lượng sao
    const renderStars = (stars) => {
        return "★".repeat(stars) + "☆".repeat(5 - stars);
    };

    return (
        <section className="testimonial">
            <div className="container">
                <div className="section-top">
                    <h2 className="section-title">Testimonial</h2>
                    <p className="section-subtitle">
                        Read customer testimonials sharing how our school uniforms combine comfort, style, and
                        durability for everyday wear.
                    </p>
                </div>
                <div className="testimonial__list">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="testimonial__card">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="testimonial__avatar"
                                    />
                                    <p className="testimonial__role">{testimonial.name}</p>
                                    <span className="testimonial__desc">{testimonial.role}</span>
                                    <div className="testimonial__stars">{renderStars(testimonial.stars)}</div>
                                    <p className="testimonial__text">{testimonial.text}</p>
                                    <p className="testimonial__name">{testimonial.name}</p>
                                    <p className="testimonial__address">{testimonial.address}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

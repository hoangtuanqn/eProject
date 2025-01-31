"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../assets/css/team.css";

import teamMembers from '../../data/team.json'

export default function Team() {
    return (
        <section className="creative-team">
            <div className="container">
                <div className="creative-team__list">
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
                            1200: { slidesPerView: 4 },
                        }}
                    >
                        {teamMembers.map((member) => (
                            <SwiperSlide key={member.id}>
                                <article className="creative-team__item">
                                    <div className="creative-team__image-wrapper">
                                        <img
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            className="creative-team__image"
                                        />
                                        <div className="creative-team__overlay">
                                            <div className="creative-team__social">
                                                <a href={member.social.github} className="creative-team__social-link">
                                                    <Github size={20} />
                                                </a>
                                                <a href={member.social.twitter} className="creative-team__social-link">
                                                    <Twitter size={20} />
                                                </a>
                                                <a href={member.social.linkedin} className="creative-team__social-link">
                                                    <Linkedin size={20} />
                                                </a>
                                                <a
                                                    href={member.social.instagram}
                                                    className="creative-team__social-link"
                                                >
                                                    <Instagram size={20} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creative-team__content">
                                        <h3 className="creative-team__name">{member.name}</h3>
                                        <p className="creative-team__role">{member.role}</p>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

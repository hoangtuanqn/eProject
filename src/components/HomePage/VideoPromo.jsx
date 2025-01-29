import React from "react";
import "../../assets/css/videoPromo.css"; // Import CSS Module

export default function VideoPromo() {
    return (
        <>
            <section className="video-promo">
                <div className="container">
                    <div className="video-promo__inner">
                        {/* Video */}
                        <div className="video-promo__video" data-aos="fade-up-right">
                            <img
                                src="/assets/imgs/video-promo.webp"
                                alt="Video Thumbnail"
                                className="video-promo__thumbnail"
                            />
                            <div className="video-promo__icon-play">
                                <img src="/assets/icon/Play.svg" alt="Play Button" className="video-promo__icon" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="video-promo__content" data-aos="fade-up-left">
                            <h2 className="video-promo__title">Discover Our Product</h2>
                            <a href="#!" className="video-promo__subtitle">
                                FOLLOW US ON YOUTUBE
                                <img src="/assets/icon/youtube.svg" alt="YouTube Icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

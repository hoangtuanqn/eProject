import React from "react";
import '../../assets/css/gradient.css'
export default function Gradient() {
    return (
        <>
            {/* Gradient */}
            <section className="gradient">
                <div className="container">
                    <div className="gradient__inner dfbetween">
                        <div className="gradient__info dfbetween hiddenMobile">
                            <a href="tel:0812665001" className="gradient__phone dfcenter">
                                <img src="/assets/icon/phone.svg" alt="Phone" className="gradient__icon" />
                                0812665001
                            </a>
                            <a href="mailto:phamhoangtuanqn@gmail.com" className="gradient__email dfcenter">
                                <img src="/assets/icon/email.svg" alt="Email" className="gradient__icon" />
                                phamhoangtuanqn@gmail.com
                            </a>
                        </div>
                        <p className="gradient__message">
                            Free Delivery on <strong className="bold">orders</strong> over $260
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

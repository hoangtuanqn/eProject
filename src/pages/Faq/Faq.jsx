"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "../../styles/faq.css";

const faqData = [
    {
        id: 1,
        question: "Do we offer any warranties on our cars?",
        answer: [
            "There is a limited warranty on the parts and components of the car. There are also warranties for the paint, tires, and other parts.",
            "The limited warranty is what you are entitled to when the car is purchased. The warranty for the paint, tires, and other parts are only good for so long as the car is in use.",
        ],
    },
    {
        id: 2,
        question: "Do you need to pay for your car in full before you get it?",
        answer: [
            "No, we offer various financing options to help you purchase your dream car. You can choose from different payment plans and down payment options that suit your budget.",
            "We work with multiple financial institutions to ensure you get the best possible rates and terms for your car loan.",
        ],
    },
    {
        id: 3,
        question: "What is the average cost of a new car these days?",
        answer: [
            "The average cost of a new car varies significantly depending on the make, model, and features. Entry-level vehicles typically start around $20,000, while luxury vehicles can exceed $50,000.",
            "We recommend discussing your budget with our sales team who can help you find the perfect vehicle within your price range.",
        ],
    },
    {
        id: 4,
        question: "How long does shipping typically take?",
        answer: [
            "Shipping times vary depending on your location and the vehicle's availability. Typically, domestic deliveries take 5-7 business days, while international shipping may take 2-4 weeks.",
            "We provide real-time tracking information so you can monitor your vehicle's journey to you.",
        ],
    },
    {
        id: 5,
        question: "What shipping methods do you offer?",
        answer: [
            "We offer several shipping methods including enclosed transport for luxury vehicles, open transport for standard vehicles, and expedited shipping for urgent deliveries.",
            "Our shipping partners are fully insured and experienced in handling valuable vehicles.",
        ],
    },
];

export default function Faq() {
    const [openQuestion, setOpenQuestion] = useState(1);

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <section className="faq">
            <div className="container">
                <div className="faq__grid">
                    <div className="faq__content">
                        <h1 className="faq__title">Shipping information</h1>
                        <div className="faq__questions">
                            {faqData.map((item) => (
                                <div key={item.id} className="faq__item">
                                    <button
                                        className={`faq__question ${openQuestion === item.id ? "active" : ""}`}
                                        onClick={() => toggleQuestion(item.id)}
                                    >
                                        <span>{item.question}</span>
                                        {openQuestion === item.id ? (
                                            <Minus className="faq__icon" />
                                        ) : (
                                            <Plus className="faq__icon" />
                                        )}
                                    </button>
                                    <div className={`faq__answer ${openQuestion === item.id ? "active" : ""}`}>
                                        {item.answer.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="faq__image">
                        <img
                            src="/assets/imgs/faq.webp"
                            alt="Customer Service Representative"
                            width={600}
                            height={800}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

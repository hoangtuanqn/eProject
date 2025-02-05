import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "../../styles/faq.css";
import faqData from "../../data/faq.json";

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

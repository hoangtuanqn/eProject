import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import newsData from "../../data/news.json";
import "../../styles/news.css";

export default function News() {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };

        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    return (
        <section className="news-page">
            <div className="container">
                {/* <motion.h1
                    className="section-title"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Latest News
                </motion.h1>
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Stay updated with our latest articles and insights
                </motion.p> */}

                <div className="news-grid">
                    {newsData.map((article, index) => (
                        <motion.article
                            key={article.slug}
                            className="news-card"
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link to={`/blog/news/${article.slug}`} className="news-card__image-wrapper">
                                <img
                                    src={article.thumbnail || "/placeholder.svg"}
                                    alt={article.name}
                                    className="news-card__image"
                                />
                                <div className="news-card__overlay">
                                    <span>Read More</span>
                                </div>
                            </Link>
                            <div className="news-card__content">
                                <Link to={`/blog/news/${article.slug}`}>
                                    <h2 className="news-card__title">{article.name}</h2>
                                </Link>

                                <div className="news-card__meta">
                                    <div className="news-card__meta-item">
                                        <User size={16} />
                                        <span>{article.author}</span>
                                    </div>
                                    <div className="news-card__meta-item">
                                        <Calendar size={16} />
                                        <span>{formatDate(article.published_date)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

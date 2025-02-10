import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import newsData from "../../data/news.json";
import "../../styles/blogDetail.css";

export default function BlogDetail({ article }) {
    if (!article) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <article className="blog-detail">
            <div className="container">
                <motion.header
                    className="blog-detail__header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="blog-detail__title">{article.name}</h1>
                    <div className="blog-detail__meta">
                        <div className="blog-detail__meta-item">
                            <Calendar size={20} />
                            <span>{formatDate(article.published_date)}</span>
                        </div>
                        <div className="blog-detail__meta-item">
                            <User size={20} />
                            <span>{article.author}</span>
                        </div>
                    </div>
                </motion.header>

                <motion.img
                    src={article.thumbnail}
                    alt={article.name}
                    className="blog-detail__featured-image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                <motion.div
                    className="blog-detail__content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </article>
    );
}

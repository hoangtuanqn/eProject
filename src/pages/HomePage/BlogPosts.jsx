import React from "react";
import "../../styles/blogPosts.css";
import { ArrowRight } from "lucide-react";
export default function BlogPosts() {
    return (
        <>
            <section className="blog-posts">
                <div className="container">
                    <h2 className="section-title">Check Our Blog Posts</h2>
                    <p className="section-subtitle">These blogs provide information</p>

                    <div className="blog-posts__grid">
                        {/* Blog 1 */}
                        <article className="blog-posts__item" data-aos="flip-left">
                            <figure>
                                <a href="#!">
                                    <img
                                        src="/assets/imgs/blog-1.webp"
                                        alt="Street Style Stories Unfold"
                                        className="blog-posts__image"
                                    />
                                </a>
                            </figure>
                            <div className="blog-posts__content">
                                <h3 className="blog-posts__name">Street Style Stories Unfold</h3>
                                <a href="#!" className="blog-posts__link">
                                    Read more
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        </article>

                        {/* Blog 2 */}
                        <article className="blog-posts__item" data-aos="fade-down">
                            <figure>
                                <a href="#!">
                                    <img
                                        src="/assets/imgs/blog-2.webp"
                                        alt="Dressing the Dream Closet"
                                        className="blog-posts__image"
                                    />
                                </a>
                            </figure>
                            <div className="blog-posts__content">
                                <h3 className="blog-posts__name">Dressing the Dream Closet</h3>
                                <a href="#!" className="blog-posts__link">
                                    Read more
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        </article>

                        {/* Blog 3 */}
                        <article className="blog-posts__item" data-aos="fade-up">
                            <figure>
                                <a href="#!">
                                    <img
                                        src="/assets/imgs/blog-3.webp"
                                        alt="Sleek Seams and Patterns"
                                        className="blog-posts__image"
                                    />
                                </a>
                            </figure>
                            <div className="blog-posts__content">
                                <h3 className="blog-posts__name">Sleek Seams and Patterns</h3>
                                <a href="#!" className="blog-posts__link">
                                    Read more
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}

import React, { useState } from "react";
import data from "../../data/categories.json";
import product from "../../data/product.json";
import "../../assets/css/categories.css";
import { Link } from "react-router-dom";
export default function Categories() {
    const [counter, setCounter] = useState(() => {
        const objectCounter = {};
        product.forEach((item) => {
            objectCounter[item.category] = objectCounter[item.category] ? ++objectCounter[item.category] : 1;
        });
        return objectCounter;
    });
    return (
        <section className="categories">
            <div className="container">
                <div className="categories__grid">
                    {data.map((category) => (
                        <div className="categories__column" key={category.id}>
                            <figure className="categories__imgs">
                                <Link to={`/category/${category.slug}`}>
                                    <img src={category.image} alt={category.name} className="categories__img" />
                                </Link>
                            </figure>
                            <div className="categories__info">
                                <h3>
                                    <Link className="categories__title" to={`/category/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </h3>
                                <span className="categories__counter">{counter[category.name] ?? 0} item</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

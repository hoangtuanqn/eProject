import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/breadcrumb.css";

export default function Breadcrumb({ title, items }) {
    return (
        <div className="breadcrumb">
            <h1 className="breadcrumb__title">{title}</h1>
            <div className="breadcrumb__list">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="breadcrumb__item">
                            {index === items.length - 1 ? (
                                <span>{item.label}</span>
                            ) : (
                                <Link to={item.url} className="breadcrumb__link">
                                    {item.label}
                                </Link>
                            )}
                        </div>
                        {index < items.length - 1 && <span className="breadcrumb__separator">/</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

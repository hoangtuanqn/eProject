import React from "react";
import Categories from "./Categories";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Categories", url: "/categories" },
    ];
    return (
        <>
            <Header />
            <main className="main">
                <Breadcrumb title="Categories" items={breadcrumbItems} />
                <Categories />
            </main>
            <Footer />
        </>
    );
}

import React from "react";
import Categories from "./Categories";
import Breadcrumb from "../../components/Breadcrumb";

export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Categories", url: "/categories" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="Categories" items={breadcrumbItems} />
                <Categories />
            </main>
        </>
    );
}

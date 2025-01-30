import React from "react";
import Policies from "./Policies";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Policies", url: "/pages/policies" },
    ];
    return (
        <>
            <Header />
            <main className="main">
                <Breadcrumb title="Our Policies" items={breadcrumbItems} />
                <Policies />
            </main>
            <Footer />
        </>
    );
}

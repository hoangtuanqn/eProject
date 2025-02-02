import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import AboutUs from "./AboutUs";

export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/pages/about" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="About Us" items={breadcrumbItems} />
                <AboutUs />
            </main>
        </>
    );
}

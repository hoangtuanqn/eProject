import React from "react";
import Contact from "./Contact";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Contact", url: "/pages/contact" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="Contact" items={breadcrumbItems} />

                <Contact />
            </main>
        </>
    );
}

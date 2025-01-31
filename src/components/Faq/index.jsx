import React from "react";
import Faq from "./Faq";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "FAQ", url: "/pages/faq" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="FAQ" items={breadcrumbItems} />
                <Faq />
            </main>
        </>
    );
}

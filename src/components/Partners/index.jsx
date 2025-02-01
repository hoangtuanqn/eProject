import React from "react";
import Partners from "./Partners";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Partners", url: "/pages/partners" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="" items={breadcrumbItems} />
                <Partners />
            </main>
        </>
    );
}

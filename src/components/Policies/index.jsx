import React from "react";
import Policies from "./Policies";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Policies", url: "/pages/policies" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="Our Policies" items={breadcrumbItems} />
                <Policies />
            </main>
        </>
    );
}

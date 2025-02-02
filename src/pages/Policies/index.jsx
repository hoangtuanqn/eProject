import React from "react";
import Policies from "./Policies";
import Breadcrumb from "../../components/Breadcrumb";
export default function index() {
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Policies", url: "/pages/policies" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="Shipping & Returns Policy" items={breadcrumbItems} />
                <Policies />
            </main>
        </>
    );
}

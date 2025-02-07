import React from "react";
import Coupons from "./Coupons";
import Breadcrumb from "../../components/Breadcrumb";
import useTitle from "../../hooks/useTitle";

export default function Index() {
    useTitle("Coupons");
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Coupons", url: "/pages/coupons" },
    ];

    return (
        <>
            <main className="main">
                <Breadcrumb title="Coupons" items={breadcrumbItems} />
                <Coupons />
            </main>
        </>
    );
}

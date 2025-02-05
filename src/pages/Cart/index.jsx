import React from "react";
import Cart from "./Cart";
import Breadcrumb from "../../components/Breadcrumb";
import useTitle from "../../hooks/useTitle";

export default function Index() {
    useTitle("Your Shopping Cart");
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Cart", url: "/cart" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="Shopping Cart" items={breadcrumbItems} />
                <Cart />
            </main>
        </>
    );
}

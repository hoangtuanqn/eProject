import React from "react";
import WishList from "./WishList";
import useTitle from "../../hooks/useTitle";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
export default function Index() {
    useTitle("Wish List");
    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Wish List", url: "/wishlist" },
    ];
    return (
        <>
            <main className="main">
                <Breadcrumb title="Wish List" items={breadcrumbItems} style={{ alignItems: "flex-start" }} />
                <WishList />
            </main>
        </>
    );
}

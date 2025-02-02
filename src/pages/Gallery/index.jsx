import React from "react";
import Gallery from "./Gallery";
import Breadcrumb from "../../components/Breadcrumb";

const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: "Our Gallery", url: "/pages/gallery" },
];
export default function index() {
    return (
        <>
            <main className="main">
                <Breadcrumb title="Our Gallery" items={breadcrumbItems} />

                <Gallery />
            </main>
        </>
    );
}

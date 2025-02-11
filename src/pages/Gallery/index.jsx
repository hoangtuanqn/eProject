import React from "react";
import Gallery from "./Gallery";
import Breadcrumb from "~/components/Breadcrumb";
import useTitle from "~/hooks/useTitle";

const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: "Our Gallery", url: "/pages/gallery" },
];
export default function Index() {
    useTitle("Gallery");
    return (
        <>
            <main className="main">
                <Breadcrumb title="Our Gallery" items={breadcrumbItems} />

                <Gallery />
            </main>
        </>
    );
}

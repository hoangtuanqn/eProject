import React from "react";
import Team from "./Team";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: "Team", url: "/pages/team" },
];
export default function index() {
    return (
        <>
            <main className="main">
                <Breadcrumb title="Creative team" items={breadcrumbItems} />

                <Team />
            </main>
        </>
    );
}

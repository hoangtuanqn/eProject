import React from "react";
import NotFound from "./NotFound";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

export default function index() {
    return (
        <>
            <Header />
            <main className="main">
                <NotFound />
            </main>
            <Footer />
        </>
    );
}

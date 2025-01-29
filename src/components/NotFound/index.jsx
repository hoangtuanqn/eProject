import React from "react";
import NotFound from "./NotFound";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Gradient from "../HomePage/Gradient";
export default function index() {
    return (
        <>
            <Gradient />
            <Header />
            <main className="main">
                <NotFound />
            </main>
            <Footer />
        </>
    );
}

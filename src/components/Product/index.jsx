import React from "react";
import Product from "./Product";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

export default function index() {
    return (
        <>
            <Header />
            <main className="main">
                <Product />
            </main>
            <Footer />
        </>
    );
}

import React from "react";
import Search from "./Search";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
export default function index() {
    return (
        <>
            <Header />
            <main className="main">
                <Search />
            </main>
            <Footer />
        </>
    );
}

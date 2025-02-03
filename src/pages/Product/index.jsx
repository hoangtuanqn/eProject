import React from "react";
import Product from "./Product";
import useTitle from "../../hooks/useTitle";
export default function Index() {
    useTitle("Product");
    return (
        <>
            <main className="main">
                <Product />
            </main>
        </>
    );
}

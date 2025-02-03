import React from "react";
import WishList from "./WishList";
import useTitle from "../../hooks/useTitle";
export default function Index() {
    useTitle("Wish List");
    return (
        <>
            <main className="main">
                <WishList />
            </main>
        </>
    );
}

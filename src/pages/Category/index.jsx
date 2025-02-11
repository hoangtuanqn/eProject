import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import Category from "./Category";
import Breadcrumb from "~/components/Breadcrumb";
import useTitle from "~/hooks/useTitle";
import categories from "~/data/categories.json";

export default function IndexPage() {
    const { slug } = useParams();

    // Dùng useMemo để tính toán nameCategory
    const nameCategory = useMemo(() => {
        const category = categories.find((c) => c.slug === slug);
        return category ? category.name : slug === "all-product" ? "All Product" : "404";
    }, [slug]);

    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: "Categories", url: "/categories" },
        { label: nameCategory, url: `/pages/${slug}` },
    ];
    useTitle(nameCategory);

    return (
        <>
            <main className="main2">
                <Breadcrumb title={nameCategory} items={breadcrumbItems} style={{ alignItems: "flex-start" }} />
                <Category nameCategory={nameCategory} />
            </main>
        </>
    );
}

import productsData from "~/data/products.json";
export const calculateOriginalPrice = (finalPrice, salePercentage) => {
    if (!salePercentage) return finalPrice;
    // Ví dụ: finalPrice = 100, sale = 50%
    // => originalPrice = 100 / (1 - 0.5) = 100 / 0.5 = 200
    return Math.round(finalPrice / (1 - salePercentage / 100));
};
export const handleAddRecentProduct = (id) => {
    const recentProducts = JSON.parse(localStorage.getItem("recentProducts")) || [];
    if (productsData.find((item) => item.id === id)) {
        if (recentProducts.length > 20) {
            recentProducts.pop();
        }
        if (recentProducts.indexOf(id) !== -1) {
            recentProducts.splice(recentProducts.indexOf(id), 1);
        }
        recentProducts.unshift(id);
        localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
    }
};

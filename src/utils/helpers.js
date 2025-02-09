export const calculateOriginalPrice = (finalPrice, salePercentage) => {
    if (!salePercentage) return finalPrice;
    // Ví dụ: finalPrice = 100, sale = 50%
    // => originalPrice = 100 / (1 - 0.5) = 100 / 0.5 = 200
    return Math.round(finalPrice / (1 - salePercentage / 100));
};

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import products from "../data/product.json";

export const useWishlistActions = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [wishlistItems, setWishlistItems] = useState([]);

    // Load wishlist items when component mounts
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(savedWishlist);
    }, []);

    const getUpdatedWishlistItems = (wishlist) => {
        return wishlist
            .map((itemId) => {
                const productDetails = products.find((p) => p.id === itemId);
                return productDetails ? productDetails : null;
            })
            .filter((item) => item);
    };

    const handleWishlistAction = async (product) => {
        const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isInWishlist = currentWishlist.some((id) => id === product.id);

        setLoadingStates((prev) => ({ ...prev, [product.id]: true }));

        try {
            let newWishlist;
            if (isInWishlist) {
                newWishlist = currentWishlist.filter((id) => id !== product.id);
                toast.success("Removed from wishlist!");
            } else {
                newWishlist = [...currentWishlist, product.id];
                toast.success("Added to wishlist!");
            }

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
            setWishlistItems(newWishlist);
            return newWishlist;
        } catch (error) {
            console.error("Error handling wishlist action:", error);
            toast.error("Error occurred!");
            return null;
        } finally {
            setLoadingStates((prev) => ({ ...prev, [product.id]: false }));
        }
    };

    const isProductInWishlist = (productId) => {
        return wishlistItems.some((id) => id === productId);
    };

    return {
        handleWishlistAction,
        isProductInWishlist,
        loadingStates,
        wishlistItems,
        getUpdatedWishlistItems,
    };
};

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import products from "../data/product.json";

export const useCartActions = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [cartItems, setCartItems] = useState([]);

    // Load cart items when component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    const getUpdatedCartItems = (cart, includeNotes = false) => {
        return cart
            .map((item) => {
                const productDetails = products.find((p) => p.id === item.id);
                return productDetails
                    ? {
                          ...productDetails,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity || 1,
                          ...(includeNotes && { note: item.note || "" }),
                      }
                    : null;
            })
            .filter((item) => item);
    };

    const handleCartAction = async (product) => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const isInCart = currentCart.some((item) => item.id === product.id);

        if (isInCart) {
            const confirmDelete = window.confirm("Do you want to remove this item from cart?");
            if (!confirmDelete) {
                return;
            }
        }

        setLoadingStates((prev) => ({ ...prev, [product.id]: true }));

        try {
            let newCart;
            if (isInCart) {
                newCart = currentCart.filter((item) => item.id !== product.id);
                toast.success("Removed from cart!");
            } else {
                const newItem = {
                    id: product.id,
                    size: product.sizes[0],
                    color: product.colors[0],
                    quantity: 1,
                };
                newCart = [...currentCart, newItem];
                toast.success("Added to cart!");
            }

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            localStorage.setItem("cart", JSON.stringify(newCart));
            setCartItems(newCart);
            return newCart;
        } catch (error) {
            console.error("Error handling cart action:", error);
            toast.error("Error occurred!");
            return null;
        } finally {
            setLoadingStates((prev) => ({ ...prev, [product.id]: false }));
        }
    };

    const isProductInCart = (productId) => {
        return cartItems.some((item) => item.id === productId);
    };

    return {
        handleCartAction,
        isProductInCart,
        loadingStates,
        cartItems,
        getUpdatedCartItems,
    };
};

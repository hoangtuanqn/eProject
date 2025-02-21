import axios from "axios";
import toast from "react-hot-toast";
import { handleGetAccessTokenPaypal } from "~/utils/menuHelpers";
export const handlePaypalCheckout = async ({
    total,
    calculateSubtotal,
    shippingCost,
    cartItems,
    setIsLoading,
    formData,
}) => {
    try {
        setIsLoading(true);

        // Kiểm tra dữ liệu đầu vào
        if (!cartItems || cartItems.length === 0) {
            throw new Error("Giỏ hàng trống");
        }

        if (!formData) {
            throw new Error("Thiếu thông tin đặt hàng");
        }

        // Save form data to localStorage for later use
        localStorage.setItem("checkoutFormData", JSON.stringify(formData));
        // Lưu cart items để đồng bộ
        localStorage.setItem("cartCheckoutPaypal", JSON.stringify(cartItems));

        const access_token_paypal = await handleGetAccessTokenPaypal();
        if (!access_token_paypal) {
            throw new Error("Không thể kết nối với PayPal");
        }

        const response = await axios.post(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: total.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: calculateSubtotal().toFixed(2),
                                },
                                shipping: {
                                    currency_code: "USD",
                                    value: shippingCost.toFixed(2),
                                },
                            },
                        },
                        items: cartItems.map((item) => ({
                            name: `${item.name} - Size: ${item.size} - Color: ${item.color}`,
                            unit_amount: {
                                currency_code: "USD",
                                value: item.price.toFixed(2),
                            },
                            quantity: item.quantity,
                            description: `Size: ${item.size}, Color: ${item.color}`,
                        })),
                        custom_id: 123,
                    },
                ],
                application_context: {
                    return_url: `${window.location.origin}/order-paypal`,
                    cancel_url: `${window.location.origin}/order-error`,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token_paypal}`,
                },
            },
        );

        if (response.data.id) {
            const approvalUrl = response.data.links.find((link) => link.rel === "approve").href;
            window.location.href = approvalUrl;
        } else {
            setIsLoading(false);
            toast.error("Could not create order. Please try again!");
        }
    } catch (error) {
        setIsLoading(false);
        const errorMessage = error.message || "Thanh toán thất bại. Vui lòng thử lại!";
        toast.error(errorMessage);
        throw error;
    }
};

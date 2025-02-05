import { PayPalButtons } from "@paypal/react-paypal-js";
import { handleOrder } from "./handleOrder";
import "../../styles/checkOuts.css";
import { useNavigate } from "react-router-dom";

const PaypalCheckout = ({ total, cartItems, formData, isProcessing, setIsProcessing }) => {
    const navigate = useNavigate();
    const handlePayPalOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                    },
                },
            ],
        });
    };

    const handlePayPalApprove = async (data, actions) => {
        try {
            setIsProcessing(true);
            await actions.order.capture();

            // Xử lý đơn hàng sau khi thanh toán PayPal thành công
            const orderId = await handleOrder(
                { ...formData, paymentMethod: "paypal" },
                cartItems,
                () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                2, // shippingCost
                total,
            );

            // Chuyển hướng đến trang thành công
            navigate(`/order-success/${orderId}`);
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout__paypal">
            <PayPalButtons
                createOrder={handlePayPalOrder}
                onApprove={handlePayPalApprove}
                style={{
                    shape: "pill",
                    layout: "vertical",
                    color: "silver",
                    label: "checkout",
                }}
                disabled={isProcessing}
            />
        </div>
    );
};

export default PaypalCheckout;

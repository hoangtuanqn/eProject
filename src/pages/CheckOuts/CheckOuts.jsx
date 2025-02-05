import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    CreditCard,
    Truck,
    User,
    Phone,
    Mail,
    Home,
    Globe,
    MapPinned,
    Building2,
    Mailbox,
    StickyNote,
} from "lucide-react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckout from "./Paypal";
import "../../styles/checkOuts.css";
import products from "../../data/product.json";
import { useNavigate } from "react-router-dom";
import { handleOrder } from "./handleOrder";

export default function CheckOut() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        note: "",
        paymentMethod: "cod",
    });
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cartStorage.length) {
            navigate("/categories");
        }
        const cartWithDetails = cartStorage

            .map((item) => {
                const productDetails = products.find((p) => p.id === item.id);
                return productDetails
                    ? {
                          ...productDetails,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity || 1,
                      }
                    : null;
            })
            .filter((item) => item);
        setCartItems(cartWithDetails);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const shippingCost = 2;
    const total = calculateSubtotal() + shippingCost;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.paymentMethod === "cod") {
            setIsProcessing(true);
            try {
                const orderId = await handleOrder(formData, cartItems, calculateSubtotal, shippingCost, total);
                window.location.href = `/order-success/${orderId}`;
            } catch (error) {
                console.error("Order failed:", error);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <PayPalScriptProvider
            options={{
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                "enable-funding": "venmo",
                "disable-funding": "",
                "buyer-country": "US",
                currency: "USD",
                "data-page-type": "product-details",
                components: "buttons",
                "data-sdk-integration-source": "developer-studio",
            }}
        >
            <section className="checkout">
                <div className="container">
                    {/* <h1 className="section-title">Checkout</h1>
                    <p className="section-subtitle">Complete your order</p> */}

                    <form className="checkout__layout" onSubmit={handleSubmit}>
                        <div className="checkout__form">
                            <motion.div
                                className="checkout__section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="checkout__section-title">
                                    <User size={20} />
                                    Contact Information
                                </h2>
                                <div className="checkout__input-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
                                    <div className="checkout__field">
                                        <label className="checkout__label">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="checkout__input"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your first name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="checkout__input"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <Mail size={16} />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="checkout__input"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="example@email.com"
                                        />
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <Phone size={16} />
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="checkout__input"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="checkout__section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h2 className="checkout__section-title">
                                    <MapPin size={20} />
                                    Shipping Address
                                </h2>
                                <div className="checkout__input-group">
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <Home size={16} />
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="checkout__input"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Street address"
                                        />
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">Apartment, suite, etc. (optional)</label>
                                        <input
                                            type="text"
                                            name="apartment"
                                            className="checkout__input"
                                            value={formData.apartment}
                                            onChange={handleInputChange}
                                            placeholder="Apartment, suite, unit, etc."
                                        />
                                    </div>
                                    <div className="checkout__input-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <Globe size={16} />
                                                Country *
                                            </label>
                                            <select
                                                name="country"
                                                className="checkout__input"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Country</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="US">United States</option>
                                            </select>
                                        </div>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <MapPinned size={16} />
                                                State/Province *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                className="checkout__input"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your state or province"
                                            />
                                        </div>
                                    </div>
                                    <div className="checkout__input-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <Building2 size={16} />
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="checkout__input"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your city"
                                            />
                                        </div>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <Mailbox size={16} />
                                                Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                className="checkout__input"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your postal code (e.g., 12345)"
                                            />
                                        </div>
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <StickyNote size={16} />
                                            Notes for Shipper (Optional)
                                        </label>
                                        <textarea
                                            name="note"
                                            className="checkout__input checkout__input--textarea"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            placeholder="E.g: Please call me before delivery, Leave at front door, Fragile items, etc."
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="checkout__section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="checkout__section-title">
                                    <CreditCard size={20} />
                                    Payment Method
                                </h2>
                                <div className="checkout__payment-methods">
                                    <div className="checkout__payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === "cod"}
                                            onChange={handleInputChange}
                                            className="checkout__payment-radio"
                                            id="cod"
                                        />
                                        <label className="checkout__payment-label" htmlFor="cod">
                                            <span className="checkout__payment-check"></span>
                                            <div className="checkout__payment-content">
                                                <div className="checkout__payment-title">Cash on Delivery</div>
                                                <div className="checkout__payment-description">
                                                    Pay with cash upon delivery
                                                </div>
                                            </div>
                                            <img
                                                src="/assets/icon/payment-upon-receipt.png"
                                                alt="Payment upon receipt"
                                                className="checkout__payment-icon"
                                            />
                                        </label>
                                    </div>

                                    <div className="checkout__payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={formData.paymentMethod === "paypal"}
                                            onChange={handleInputChange}
                                            className="checkout__payment-radio"
                                            id="paypal"
                                        />
                                        <label className="checkout__payment-label" htmlFor="paypal">
                                            <span className="checkout__payment-check"></span>
                                            <div className="checkout__payment-content">
                                                <div className="checkout__payment-title">PayPal</div>
                                                <div className="checkout__payment-description">
                                                    Pay with your PayPal account
                                                </div>
                                            </div>
                                            <img
                                                src="/assets/icon/paypal-big.png"
                                                alt="PayPal"
                                                className="checkout__payment-icon"
                                            />
                                        </label>
                                    </div>
                                </div>

                                {formData.paymentMethod === "paypal" && (
                                    <PaypalCheckout
                                        total={total}
                                        cartItems={cartItems}
                                        formData={formData}
                                        isProcessing={isProcessing}
                                        setIsProcessing={setIsProcessing}
                                    />
                                )}
                            </motion.div>
                        </div>

                        <div className="checkout__summary">
                            <motion.div
                                className="checkout__section"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="checkout__section-title">
                                    <Truck size={20} />
                                    Order Summary
                                </h2>
                                <div className="checkout__items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="checkout__item">
                                            <div className="checkout__item-image">
                                                <img src={item.thumbnail || "/placeholder.svg"} alt={item.name} />
                                            </div>
                                            <div className="checkout__item-info">
                                                <h3 className="checkout__item-name">{item.name}</h3>

                                                <p className="checkout__item-meta">
                                                    Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                                                </p>
                                                <p className="checkout__item-price">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="checkout__totals">
                                    <div className="checkout__total-row">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(calculateSubtotal())}</span>
                                    </div>
                                    <div className="checkout__total-row">
                                        <span>Shipping</span>
                                        <span>{formatCurrency(shippingCost)}</span>
                                    </div>
                                    <div className="checkout__total-row checkout__total-row--final">
                                        <span>Total</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                {formData.paymentMethod === "cod" && (
                                    <button type="submit" className="checkout__submit" disabled={isProcessing}>
                                        {isProcessing ? "Processing..." : "Place Order"}
                                    </button>
                                )}
                            </motion.div>
                        </div>
                    </form>
                </div>
            </section>
        </PayPalScriptProvider>
    );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as Yup from "yup";
import {
    Building2,
    CreditCard,
    Globe,
    Home,
    Mail,
    Mailbox,
    MapPin,
    MapPinned,
    Phone,
    StickyNote,
    Truck,
    User,
} from "lucide-react";

import PaypalCheckout from "./Paypal";
import { handleOrder } from "./handleOrder";
import products from "../../data/product.json";
import countries from "../../data/countries.json";
import "../../styles/checkOuts.css";
import toast from "react-hot-toast";

export default function CheckOut() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Validation Schema với Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name must be less than 50 characters"),
        lastName: Yup.string()
            .required("Last name is required")
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name must be less than 50 characters"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number format"),
        address: Yup.string().required("Address is required").min(5, "Address must be at least 5 characters"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        postalCode: Yup.string()
            .required("Postal code is required")
            .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code format"),
        country: Yup.string().required("Country is required"),
        paymentMethod: Yup.string()
            .required("Payment method is required")
            .oneOf(["cod", "paypal"], "Invalid payment method"),
    });

    // Formik hook
    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema,
        onSubmit: async (values) => {
            if (values.paymentMethod === "cod") {
                setIsProcessing(true);
                try {
                    const orderId = await handleOrder(values, cartItems, calculateSubtotal, shippingCost, total);
                    window.location.href = `/order-success/${orderId}`;
                } catch (error) {
                    console.error("Order failed:", error);
                } finally {
                    setIsProcessing(false);
                }
            }
        },
    });

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

                    <form className="checkout__layout" onSubmit={formik.handleSubmit}>
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
                                            className={`checkout__input ${
                                                formik.touched.firstName && formik.errors.firstName ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("firstName")}
                                            autoFocus
                                            placeholder="John"
                                            disabled={formik.values.paymentMethod === "paypal"}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName && (
                                            <div className="error-message">{formik.errors.firstName}</div>
                                        )}
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className={`checkout__input ${
                                                formik.touched.lastName && formik.errors.lastName ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("lastName")}
                                            placeholder="Doe"
                                            disabled={formik.values.paymentMethod === "paypal"}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName && (
                                            <div className="error-message">{formik.errors.lastName}</div>
                                        )}
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <Mail size={16} />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`checkout__input ${
                                                formik.touched.email && formik.errors.email ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("email")}
                                            required
                                            placeholder="example@email.com"
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="error-message">{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <Phone size={16} />
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={`checkout__input ${
                                                formik.touched.phone && formik.errors.phone ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("phone")}
                                            required
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        {formik.touched.phone && formik.errors.phone && (
                                            <div className="error-message">{formik.errors.phone}</div>
                                        )}
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
                                            className={`checkout__input ${
                                                formik.touched.address && formik.errors.address ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("address")}
                                            required
                                            placeholder="Street address"
                                        />
                                        {formik.touched.address && formik.errors.address && (
                                            <div className="error-message">{formik.errors.address}</div>
                                        )}
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">Apartment, suite, etc. (optional)</label>
                                        <input
                                            type="text"
                                            name="apartment"
                                            className={`checkout__input ${
                                                formik.touched.apartment && formik.errors.apartment ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("apartment")}
                                            placeholder="Apartment, suite, unit, etc."
                                        />
                                        {formik.touched.apartment && formik.errors.apartment && (
                                            <div className="error-message">{formik.errors.apartment}</div>
                                        )}
                                    </div>
                                    <div className="checkout__input-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <Globe size={16} />
                                                Country *
                                            </label>
                                            <select
                                                name="country"
                                                className={`checkout__input ${
                                                    formik.touched.country && formik.errors.country ? "error" : ""
                                                }`}
                                                {...formik.getFieldProps("country")}
                                                required
                                            >
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {formik.touched.country && formik.errors.country && (
                                                <div className="error-message">{formik.errors.country}</div>
                                            )}
                                        </div>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <MapPinned size={16} />
                                                State/Province *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                className={`checkout__input ${
                                                    formik.touched.state && formik.errors.state ? "error" : ""
                                                }`}
                                                {...formik.getFieldProps("state")}
                                                required
                                                placeholder="Enter your state or province"
                                            />
                                            {formik.touched.state && formik.errors.state && (
                                                <div className="error-message">{formik.errors.state}</div>
                                            )}
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
                                                className={`checkout__input ${
                                                    formik.touched.city && formik.errors.city ? "error" : ""
                                                }`}
                                                {...formik.getFieldProps("city")}
                                                required
                                                placeholder="Enter your city"
                                            />
                                            {formik.touched.city && formik.errors.city && (
                                                <div className="error-message">{formik.errors.city}</div>
                                            )}
                                        </div>
                                        <div className="checkout__field">
                                            <label className="checkout__label">
                                                <Mailbox size={16} />
                                                Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                className={`checkout__input ${
                                                    formik.touched.postalCode && formik.errors.postalCode ? "error" : ""
                                                }`}
                                                {...formik.getFieldProps("postalCode")}
                                                required
                                                placeholder="Enter your postal code (e.g., 12345)"
                                            />
                                            {formik.touched.postalCode && formik.errors.postalCode && (
                                                <div className="error-message">{formik.errors.postalCode}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">
                                            <StickyNote size={16} />
                                            Notes for Shipper (Optional)
                                        </label>
                                        <textarea
                                            name="note"
                                            className={`checkout__input checkout__input--textarea ${
                                                formik.touched.note && formik.errors.note ? "error" : ""
                                            }`}
                                            {...formik.getFieldProps("note")}
                                            placeholder="E.g: Please call me before delivery, Leave at front door, Fragile items, etc."
                                        />
                                        {formik.touched.note && formik.errors.note && (
                                            <div className="error-message">{formik.errors.note}</div>
                                        )}
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
                                            checked={formik.values.paymentMethod === "cod"}
                                            onChange={formik.handleChange}
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
                                            checked={formik.values.paymentMethod === "paypal"}
                                            onChange={(e) => {
                                                if (
                                                    !formik.values.firstName ||
                                                    !formik.values.lastName ||
                                                    !formik.values.email ||
                                                    !formik.values.phone ||
                                                    !formik.values.address
                                                ) {
                                                    toast.error(
                                                        "Please enter all information before selecting this payment method",
                                                    );
                                                    return;
                                                }
                                                formik.handleChange(e);
                                            }}
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

                                {formik.values.paymentMethod === "paypal" && (
                                    <PaypalCheckout
                                        total={total}
                                        cartItems={cartItems}
                                        formData={formik.values}
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

                                {formik.values.paymentMethod === "cod" && (
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

import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/contact.css";
import axios from "axios";
import stores from "../../data/stores.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        store: stores[0].name,
    });
    const [selectedStore, setSelectedStore] = useState(stores[0]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const inputRefs = {
        name: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        message: useRef(null),
    };

    // Thêm các variants cho animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "store") {
            const selectedStoreData = stores.find((store) => store.name === value);
            setSelectedStore(selectedStoreData);
        }

        setErrors((prev) => ({
            ...prev,
            [name]: false,
        }));
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.email || !isValidEmail(formData.email)) newErrors.email = true;
        if (!formData.phone) newErrors.phone = true;
        if (!formData.message) newErrors.message = true;
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErrorField = Object.keys(newErrors)[0];
            inputRefs[firstErrorField].current.focus();
            toast.error("Please fill in all fields correctly.");
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post("https://679c72d387618946e65238ce.mockapi.io/api/v1/contacts", formData);

            toast.success("Form submitted successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                store: stores[0].name,
            });
        } catch (error) {
            toast.error("Error submitting form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleStoreSelect = (store) => {
        setSelectedStore(store);
    };

    return (
        <>
            <motion.section
                className="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <motion.div
                        className="contact__grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Contact Info */}
                        <motion.div className="contact__info" variants={itemVariants}>
                            <h2 className="contact__title">Let's Collaborate</h2>
                            <p className="contact__text">
                                At <strong>Maverick Dresses</strong>, we believe in the power of collaboration to drive
                                innovation and create exceptional experiences. Our mission is to provide the best in
                                uniform fashion, helping you look and feel your best in every environment. Whether
                                you're dressing for work, school, or special occasions, we offer high-quality products
                                designed to meet your needs.
                            </p>
                            <p className="contact__text">
                                We invite you to explore our collection and experience the difference. Let's work
                                together to bring your vision to life. Contact us today to discuss how we can
                                collaborate and create something extraordinary.
                            </p>

                            <motion.div className="contact__stores" variants={itemVariants}>
                                <h3 className="contact__stores-title">Our Stores</h3>
                                <div className="contact__stores-list">
                                    {stores.map((store) => (
                                        <motion.div
                                            key={store.id}
                                            className={`contact__store ${
                                                selectedStore.id === store.id ? "active" : ""
                                            }`}
                                            onClick={() => handleStoreSelect(store)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="contact__store-content">
                                                <h4 className="contact__store-name">{store.name}</h4>
                                                <div className="contact__store-details">
                                                    <div className="contact__store-detail">
                                                        <MapPin className="contact__store-icon" />
                                                        <p>{store.address}</p>
                                                    </div>
                                                    <div className="contact__store-detail">
                                                        <Phone className="contact__store-icon" />
                                                        <p>{store.phone}</p>
                                                    </div>
                                                    <div className="contact__store-detail">
                                                        <Mail className="contact__store-icon" />
                                                        <p>{store.email}</p>
                                                    </div>
                                                    <div className="contact__store-detail">
                                                        <Clock className="contact__store-icon" />
                                                        <p>{store.hours}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight
                                                className={`contact__store-arrow ${
                                                    selectedStore.id === store.id ? "active" : ""
                                                }`}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Form Contact */}
                        <motion.div className="contact__form-wrapper" variants={itemVariants}>
                            <h2 className="contact__form-title">Contact</h2>
                            <motion.form
                                className="contact__form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="contact__form-group">
                                    <label htmlFor="store" className="contact__form-label">
                                        Select Store:
                                    </label>
                                    <select
                                        id="store"
                                        name="store"
                                        className="contact__form-input"
                                        value={formData.store}
                                        onChange={handleChange}
                                        required
                                    >
                                        {stores.map((store) => (
                                            <option key={store.id} value={store.name}>
                                                {store.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="contact__form-group">
                                    <label htmlFor="name" className="contact__form-label">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`contact__form-input ${errors.name ? "error" : ""}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                        ref={inputRefs.name}
                                        required
                                    />
                                </div>

                                <div className="contact__form-group">
                                    <label htmlFor="email" className="contact__form-label">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`contact__form-input ${errors.email ? "error" : ""}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        ref={inputRefs.email}
                                        required
                                    />
                                </div>

                                <div className="contact__form-group">
                                    <label htmlFor="phone" className="contact__form-label">
                                        Phone number:
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={`contact__form-input ${errors.phone ? "error" : ""}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        ref={inputRefs.phone}
                                        required
                                    />
                                </div>

                                <div className="contact__form-group">
                                    <label htmlFor="message" className="contact__form-label">
                                        Message:
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={`contact__form-input contact__form-textarea ${
                                            errors.message ? "error" : ""
                                        }`}
                                        value={formData.message}
                                        onChange={handleChange}
                                        ref={inputRefs.message}
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn contact__form-submit"
                                    disabled={loading}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {loading ? (
                                        <img
                                            src="/assets/icon/loading.gif"
                                            className="contact__loading"
                                            alt="Loading..."
                                        />
                                    ) : (
                                        "Send Now"
                                    )}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </motion.div>

                    {/* Google Map */}
                    <motion.div
                        className="contact__map"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <iframe
                            key={selectedStore.id}
                            title={`${selectedStore.name} location map`}
                            src={`https://maps.google.com/maps?q=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}&z=15&output=embed`}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </motion.section>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

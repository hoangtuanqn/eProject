import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
// Component này sử dụng CSS chung với Footer
export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success or error
    const [loading, setLoading] = useState(false);
    const emailInputRef = useRef(null);

    const checkEmailExists = async (email) => {
        try {
            const { data } = await axios.get("https://679c74f887618946e65240bb.mockapi.io/api/v1/news");
            return data.some((entry) => entry.email === email);
        } catch (error) {
            console.error("Error checking email:", error);
            throw error;
        }
    };

    const subscribeEmail = async (email) => {
        try {
            const { data } = await axios.post("https://679c74f887618946e65240bb.mockapi.io/api/v1/news", { email });
            return data;
        } catch (error) {
            console.error("Error subscribing email:", error);
            return false;
        }
    };
    // Check format hợp lệ của email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setMessage(""); // Clear previous message

            if (!isValidEmail(email)) {
                setMessage("Invalid email format.");
                setMessageType("error");
                emailInputRef.current.classList.add("error"); // Highlight the input field
                emailInputRef.current.focus(); // Focus lại ô input
                return;
            }

            setLoading(true); // Set loading to true

            try {
                const emailExists = await checkEmailExists(email);

                if (emailExists) {
                    setMessage("Email already subscribed.");
                    setMessageType("error");
                    emailInputRef.current.classList.add("error"); // Highlight the input field
                    emailInputRef.current.focus(); // Focus lại ô input
                } else {
                    const success = await subscribeEmail(email);

                    if (success) {
                        setMessage("Subscription successful!");
                        setMessageType("success");
                        setEmail(""); // Clear the input field
                        emailInputRef.current.classList.remove("error"); // Reset border
                    } else {
                        setMessage("Subscription failed. Please try again.");
                        setMessageType("error");
                        emailInputRef.current.classList.add("error"); // Highlight the input field
                        emailInputRef.current.focus(); // Focus lại ô input
                    }
                }
            } catch (error) {
                setMessage("An error occurred. Please try again.");
                setMessageType("error");
                emailInputRef.current.classList.add("error"); // Highlight the input field
                emailInputRef.current.focus(); // Focus lại ô input
            } finally {
                setLoading(false); // Set loading to false
            }
        },
        [email],
    );

    const handleInputChange = useCallback((e) => {
        setEmail(e.target.value);
        setMessage(""); // Clear message when user starts typing
        emailInputRef.current.classList.remove("error"); // Reset border
    }, []);

    return (
        <div className="footer__column">
            <h3 className="footer__heading">Sign Up for Email</h3>
            <p className="footer__desc">Subscribe to our newsletter to receive news on update.</p>
            <form className="footer__form" onSubmit={handleSubmit}>
                <div className="footer__form-group">
                    <div className="footer__input-wrapper">
                        <input
                            type="email"
                            placeholder=" "
                            className="footer__input"
                            value={email}
                            onChange={handleInputChange}
                            required
                            ref={emailInputRef}
                        />
                        <label className="footer__label">Enter your email</label>
                    </div>
                    <button type="submit" className="btn footer__submit" disabled={loading}>
                        {loading ? (
                            <img src="/assets/icon/loading.gif" alt="Loading..." className="loading-spinner" />
                        ) : (
                            "SUBSCRIBE"
                        )}
                    </button>
                </div>
            </form>
            {message && <p className={`footer__message ${messageType}`}>{message}</p>}
        </div>
    );
}

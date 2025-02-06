import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// Component này sử dụng CSS chung với Footer
export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const emailInputRef = useRef(null);

    const checkEmailExists = async (email) => {
        try {
            const { data } = await axios.get("https://679c74f887618946e65240bb.mockapi.io/api/v1/subscribers");
            return data.some((entry) => entry.email === email);
        } catch (error) {
            toast.error("Error checking email");
            throw error;
        }
    };

    const subscribeEmail = async (email) => {
        try {
            const { data } = await axios.post("https://679c74f887618946e65240bb.mockapi.io/api/v1/subscribers", {
                email,
            });
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
            setMessage("");
            emailInputRef.current.classList.remove("error"); // Reset error state before validation

            if (!isValidEmail(email)) {
                toast.error("Invalid email format");
                emailInputRef.current.classList.add("error");
                emailInputRef.current.focus();
                return;
            }

            setLoading(true);

            try {
                const emailExists = await checkEmailExists(email);

                if (emailExists) {
                    toast.error("Email already subscribed");
                    emailInputRef.current.classList.add("error");
                    emailInputRef.current.focus();
                } else {
                    const success = await subscribeEmail(email);

                    if (success) {
                        toast.success("Subscription successful!");
                        setEmail("");
                        emailInputRef.current.classList.remove("error");
                    } else {
                        toast.error("Subscription failed. Please try again");
                        emailInputRef.current.classList.add("error");
                        emailInputRef.current.focus();
                    }
                }
            } catch (error) {
                toast.error("An error occurred. Please try again");
                emailInputRef.current.classList.add("error");
                emailInputRef.current.focus();
            } finally {
                setLoading(false);
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
        <>
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
            </div>
        </>
    );
}

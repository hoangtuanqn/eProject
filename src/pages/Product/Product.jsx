import { useState } from "react";
import { ChevronDown, ChevronUp, Minus, Plus, Share2, Facebook, Twitter, PinIcon } from "lucide-react";
import "../../styles/product.css";

export default function Product() {
    const [selectedColor, setSelectedColor] = useState("Gray");
    const [selectedSize, setSelectedSize] = useState("XL");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

        const images = [
            "/assets/imgs/product-1.png",
            "/assets/imgs/product-2.png",
            "/assets/imgs/product-3.png",
            "/assets/imgs/product-4.png",
        "/assets/imgs/product-5.png",
    ];

    const colors = [
        { name: "Gray", hex: "#808080" },
        { name: "Brown", hex: "#8B4513" },
        { name: "Pink", hex: "#FFB6C1" },
        {}
    ];

    const sizes = ["XL", "L", "M", "S"];

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        console.log("Added to cart:", {
            color: selectedColor,
            size: selectedSize,
            quantity,
        });
    };

    const handleBuyNow = () => {
        console.log("Buy now:", {
            color: selectedColor,
            size: selectedSize,
            quantity,
        });
    };

    const handleFacebookShare = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent("Slim-Fit Formal Suit Blazer");
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, "_blank");
    };

    const handleTwitterShare = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("Check out this Slim-Fit Formal Suit Blazer!");
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    };

    const handlePinterestShare = () => {
        const url = encodeURIComponent(window.location.href);
        const media = encodeURIComponent(images[selectedImage]);
        const description = encodeURIComponent("Slim-Fit Formal Suit Blazer");
        window.open(
            `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`,
            "_blank",
        );
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Slim-Fit Formal Suit Blazer",
                    text: "Check out this amazing blazer!",
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        }
    };

    return (
        <section className="product">
            <div className="container">
                <div className="product__grid">
                    <div className="product__images">
                        <div className="product__image-main">
                            <img src={images[selectedImage] || "/placeholder.svg"} alt="Slim-Fit Formal Suit Blazer" />
                        </div>
                        <div className="product__image-gallery">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`product__image-thumbnail ${selectedImage === index ? "active" : ""}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product__body">
                        <div className="product__breadcrumb">
                            <a href="/">Home</a>
                            <span>/</span>
                            <span>Slim-Fit Formal Suit Blazer</span>
                        </div>

                        <h2 className="product__title">Slim-Fit Formal Suit Blazer</h2>
                        <span className="product__price">13.594.000₫</span>
                        <span className="product__tax">Tax included.</span>

                        <span className="product__vendor">
                            <strong>Vendor:</strong> <a href="/vendors/fashion">fashion</a>
                        </span>

                        <span className="product__stock">Only 44 items in stock!</span>

                        <div className="product__variant">
                            <div className="product__variant-label">
                                <span>Color:</span>
                                <span>{selectedColor}</span>
                            </div>
                            <div className="product__color-options">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        className={`product__color-option ${
                                            selectedColor === color.name ? "active" : ""
                                        }`}
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => setSelectedColor(color.name)}
                                        aria-label={`Select ${color.name} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="product__variant">
                            <div className="product__variant-label">
                                <span>Size:</span>
                                <span>{selectedSize}</span>
                            </div>
                            <div className="product__size-options">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`product__size-option ${selectedSize === size ? "active" : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product__quantity">
                            <label className="product__quantity-label">Quantity</label>
                            <div className="product__quantity-input">
                                <button
                                    className="product__quantity-button"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <input
                                    type="number"
                                    className="product__quantity-number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                                    min="1"
                                />
                                <button className="product__quantity-button" onClick={() => handleQuantityChange(1)}>
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="product__buttons">
                            <button className="product__add-to-cart" onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                            <button className="product__buy-now" onClick={handleBuyNow}>
                                Buy It Now
                            </button>
                        </div>

                        <div className="product__secure">Guaranteed safe checkout</div>
                        <div className="product__payment">
                            <img src="/assets/icon/visa.svg" alt="Visa" class="footer__payment-img" />
                            <img src="/assets/icon/mastercard.svg" alt="Mastercard" class="footer__payment-img" />
                            <img src="/assets/icon/amex.svg" alt="American Express" class="footer__payment-img" />
                            <img src="/assets/icon/paypal.svg" alt="PayPal" class="footer__payment-img" />
                            <img src="/assets/icon/diners.svg" alt="Diners Club" class="dinersclub-img" />
                            <img src="/assets/icon/discover.svg" alt="Discover" class="footer__payment-img" />
                        </div>

                        {/* <a href="#size-guide" className="product__size-guide">
                            Size Guide
                        </a> */}

                        <div className="product__details">
                            <div className="product__details-header" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                                <h3 className="product__details-title">Details</h3>
                                {isDetailsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                            {isDetailsOpen && (
                                <div className="product__details-content">
                                    <p>
                                        Our Slim-Fit Formal Suit Blazer is crafted from premium materials for a
                                        sophisticated look. Features include:
                                    </p>
                                    <ul>
                                        <li>Slim fit design</li>
                                        <li>Notched lapels</li>
                                        <li>Two-button closure</li>
                                        <li>Front flap pockets</li>
                                        <li>Four-button cuffs</li>
                                        <li>Center back vent</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="product__share">
                            <button className="product__share-button" onClick={handleFacebookShare}>
                                <Facebook size={16} />
                                Facebook
                            </button>
                            <button className="product__share-button" onClick={handleTwitterShare}>
                                <Twitter size={16} />
                                Twitter
                            </button>
                            <button className="product__share-button" onClick={handlePinterestShare}>
                                <PinIcon size={16} />
                                Pin it
                            </button>
                            <button className="product__share-button" onClick={handleShare}>
                                <Share2 size={16} />
                                Share more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

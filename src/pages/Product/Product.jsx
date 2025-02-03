import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Minus, Plus, Share2, Facebook, Twitter, PinIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productData from "../../data/product.json";
import { useParams } from "react-router-dom";
import "../../styles/product.css";

export default function Product() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [availableSizes, setAvailableSizes] = useState([]);

    // Find product based on slug
    useEffect(() => {
        const foundProduct = productData.find((p) => p.slug === slug);
        if (foundProduct) {
            setProduct(foundProduct);
            // Set first model as default
            const firstModel = Object.keys(foundProduct.models)[0];
            setSelectedModel(firstModel);
            setAvailableSizes(foundProduct.models[firstModel].sizes);
            setSelectedSize(foundProduct.models[firstModel].sizes[0]);
        }
    }, [slug]);

    // Update sizes when model changes
    useEffect(() => {
        if (product && selectedModel) {
            setAvailableSizes(product.models[selectedModel].sizes);
            setSelectedSize(product.models[selectedModel].sizes[0]);
        }
    }, [selectedModel, product]);

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const addToCart = () => {
        if (!selectedModel || !selectedSize) {
            toast.error("Please select model and size!");
            return;
        }

        const cartItem = {
            productId: product.id,
            model: selectedModel,
            size: selectedSize,
            quantity: quantity,
            price: product.models[selectedModel].price,
            thumbnail: product.models[selectedModel].thumbnail,
            name: product.name,
        };

        // Lấy giỏ hàng từ localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItemIndex = cart.findIndex(
            (item) =>
                item.productId === cartItem.productId && item.model === cartItem.model && item.size === cartItem.size,
        );

        if (existingItemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            cart[existingItemIndex].quantity += quantity;
            toast.success("Updated quantity in cart!");
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            cart.push(cartItem);
            toast.success("Added to cart!");
        }

        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    if (!product) return <div>Loading...</div>;

    const calculateFinalPrice = () => {
        const originalPrice = product.models[selectedModel]?.price || 0;
        if (product.sale > 0) {
            return originalPrice * (1 - product.sale / 100);
        }
        return originalPrice;
    };

    // Thêm các hàm xử lý chia sẻ
    const handleFacebookShare = () => {
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    };

    const handleTwitterShare = () => {
        const url = window.location.href;
        const text = `Check out ${product.name}!`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            "_blank",
        );
    };

    const handlePinterestShare = () => {
        const url = window.location.href;
        const media = product.images[0]; // Sử dụng ảnh đầu tiên
        const description = product.name;
        window.open(
            `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(
                media,
            )}&description=${encodeURIComponent(description)}`,
            "_blank",
        );
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out ${product.name}!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        } else {
            // Fallback cho các trình duyệt không hỗ trợ Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            toast.success("Link copied!");
        }
    };

    return (
        <section className="product">
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
            <div className="container">
                <div className="product__grid">
                    <div className="product__images">
                        <div className="product__image-main">
                            <img src={product.images[selectedImage]} alt={product.name} />
                        </div>
                        <div className="product__image-gallery">
                            {product.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`product__image-thumbnail ${selectedImage === index ? "active" : ""}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product__body">
                        <div className="product__breadcrumb">
                            <a href="/">Home</a>
                            <span>/</span>
                            <span>{product.name}</span>
                        </div>

                        <h2 className="product__title">{product.name}</h2>

                        <div className="product__price-wrapper">
                            <span className="product__price">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(calculateFinalPrice())}
                            </span>
                            {product.sale > 0 && (
                                <span className="product__price--old">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(product.models[selectedModel]?.price)}
                                </span>
                            )}
                        </div>

                        <div className="product__variant">
                            <div className="product__variant-label">
                                <span>Model:</span>
                                <span>{selectedModel}</span>
                            </div>
                            <div className="product__model-options">
                                {Object.keys(product.models).map((model) => (
                                    <button
                                        key={model}
                                        className={`product__model-option ${selectedModel === model ? "active" : ""}`}
                                        onClick={() => setSelectedModel(model)}
                                    >
                                        {model}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product__variant">
                            <div className="product__variant-label">
                                <span>Size:</span>
                                <span>{selectedSize}</span>
                            </div>
                            <div className="product__size-options">
                                {availableSizes.map((size) => (
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
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                />
                                <button className="product__quantity-button" onClick={() => handleQuantityChange(1)}>
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="product__buttons">
                            <button
                                className="product__add-to-cart"
                                onClick={addToCart}
                                disabled={product.quantity === 0}
                            >
                                {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                            <button className="product__buy-now" onClick={addToCart} disabled={product.quantity === 0}>
                                {product.quantity === 0 ? "Out of Stock" : "Buy Now"}
                            </button>
                        </div>

                        <div className="product__secure">Guaranteed safe checkout</div>
                        <div className="product__payment">
                            <img src="/assets/icon/visa.svg" alt="Visa" className="footer__payment-img" />
                            <img src="/assets/icon/mastercard.svg" alt="Mastercard" className="footer__payment-img" />
                            <img src="/assets/icon/amex.svg" alt="American Express" className="footer__payment-img" />
                            <img src="/assets/icon/paypal.svg" alt="PayPal" className="footer__payment-img" />
                            <img src="/assets/icon/diners.svg" alt="Diners Club" className="dinersclub-img" />
                            <img src="/assets/icon/discover.svg" alt="Discover" className="footer__payment-img" />
                        </div>

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

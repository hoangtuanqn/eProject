import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartActions } from "../../utils/handleCart";
import "../../styles/product.css";
import { useWishlistActions } from "../../utils/handleWishlist";

import {
    Heart,
    ShoppingBag,
    Share2,
    ChevronRight,
    Truck,
    Shield,
    RefreshCw,
    Ruler,
    Star,
    ChevronDown,
    ChevronUp,
    Facebook,
    Twitter,
    // Pinterest,
    MoreHorizontal,
    ShoppingCart,
    ExternalLink,
} from "lucide-react";
import productsData from "../../data/products.json";
import toast from "react-hot-toast";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Tooltip from "../../components/Tooltip";

export default function Product() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { handleCartAction, isProductInCart } = useCartActions();
    const { handleWishlistAction, isProductInWishlist } = useWishlistActions();

    useEffect(() => {
        const foundProduct = productsData.find((p) => p.slug === slug);
        if (!foundProduct) {
            navigate("/404");
            return;
        }
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0]);
        setSelectedColor(foundProduct.colors[0]);
    }, [slug, navigate]);

    useEffect(() => {
        if (product) {
            const related = productsData
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 8);
            setRelatedProducts(related);
        }
    }, [product]);

    if (!product) return null;

    const originalPrice = product.price;
    const salePrice = product.sale > 0 ? product.price * (1 - product.sale / 100) : null;

    const handleAddToCart = async () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
        if (!selectedColor) {
            toast.error("Please select a color");
            return;
        }
        setIsLoading(true);
        console.log(selectedSize);
        await new Promise((resolve) => setTimeout(resolve, 500));
        await handleCartAction({ ...product, size: selectedSize, color: selectedColor, quantity });
        setIsLoading(false);
    };

    const handleBuyNow = async () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select size and color");
            return;
        }
        await handleCartAction({ ...product, size: selectedSize, color: selectedColor, quantity }, false);
        navigate("/checkout");
    };

    const handleSocialShare = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out this ${product.name}!`);

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(
                product.images[0],
            )}`,
        };

        window.open(shareUrls[platform], "_blank", "width=600,height=400");
    };

    const handleShare = () => {
        navigator
            .share({
                title: product.name,
                text: `Check out this ${product.name}!`,
                url: window.location.href,
            })
            .catch(() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            });
    };

    return (
        <motion.section
            className="product"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                {/* Breadcrumb */}
                <nav className="product__breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight size={16} />
                    <Link to="/category/all-product">Shop</Link>
                    <ChevronRight size={16} />
                    <span>{product.name}</span>
                </nav>

                <div className="product__grid">
                    {/* Images Section */}
                    <div className="product__images">
                        <motion.div
                            className={clsx("product__image-main", isZoomed && "zoomed")}
                            onHoverStart={() => setIsZoomed(true)}
                            onHoverEnd={() => setIsZoomed(false)}
                        >
                            {product.sale > 0 && <span className="product__sale-badge">-{product.sale}%</span>}
                            <img src={product.images[selectedImage]} alt={product.name} />
                        </motion.div>
                        <div className="product__image-gallery">
                            {product.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={clsx("product__image-thumbnail", selectedImage === index && "active")}
                                    onClick={() => setSelectedImage(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img src={image} alt={`${product.name} view ${index + 1}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product__info">
                        <div className="product__header">
                            <h1 className="product__title">{product.name}</h1>
                            <div className="product__meta">
                                <span className="product__category">{product.category}</span>
                                <div className="product__rating">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                                    ))}
                                    <span>(50 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="product__price">
                            {salePrice ? (
                                <>
                                    <span className="product__price-sale">${salePrice.toFixed(2)}</span>
                                    <span className="product__price-original">${originalPrice.toFixed(2)}</span>
                                </>
                            ) : (
                                <span className="product__price-regular">${originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        {/* Size Selection */}
                        <div className="product__sizes">
                            <div className="product__option-header">
                                <h3>Select Size</h3>
                                <button
                                    className="product__size-guide"
                                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                                >
                                    <Ruler size={18} />
                                    Size Guide
                                </button>
                            </div>
                            <AnimatePresence>
                                {showSizeGuide && (
                                    <motion.div
                                        className="product__size-guide-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        {/* Size guide content */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="product__size-options">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={clsx("product__size-option", selectedSize === size && "active")}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="product__colors">
                            <h3>Select Color</h3>
                            <div className="product__color-options">
                                {product.colors.map((color) => (
                                    <Tooltip content={color}>
                                        <button
                                            key={color}
                                            className={clsx(
                                                "product__color-option",
                                                selectedColor === color && "active",
                                            )}
                                            onClick={() => setSelectedColor(color)}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        ></button>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="product__quantity">
                            <h3>Quantity</h3>
                            <div className="product__quantity-wrap">
                                <div className="product__quantity-input">
                                    <button
                                        className="product__quantity-button"
                                        onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="product__quantity-number"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val > 0 && val <= product.quantity) {
                                                setQuantity(val);
                                            }
                                        }}
                                        min="1"
                                        max={product.quantity}
                                    />
                                    <button
                                        className="product__quantity-button"
                                        onClick={() => quantity < product.quantity && setQuantity((q) => q + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <motion.button
                                    className="btn btn--primary product__add-to-cart"
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? (
                                        <img
                                            src="/assets/icon/loading.gif"
                                            alt="Loading..."
                                            className="loading-spinner"
                                        />
                                    ) : (
                                        <>
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="product__buttons">
                            {/* <motion.button
                                className="btn btn--primary product__add-to-cart"
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </motion.button> */}

                            <motion.button
                                className="btn btn--secondary product__buy-now"
                                onClick={handleBuyNow}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ExternalLink size={20} />
                                Buy Now
                            </motion.button>

                            <motion.button
                                className={clsx(
                                    "btn btn--secondary product__add-to-wishlist",
                                    isProductInWishlist(product.id) && "active",
                                )}
                                onClick={() => handleWishlistAction(product)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Heart size={20} style={{ color: "currentColor" }} />
                            </motion.button>

                            <div className="product__share-container">
                                <motion.button
                                    className="btn btn--secondary product__share"
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Share2 size={20} />
                                </motion.button>

                                {showShareMenu && (
                                    <div className="product__share-menu">
                                        <button onClick={() => handleSocialShare("facebook")}>
                                            <Facebook size={20} /> Facebook
                                        </button>
                                        <button onClick={() => handleSocialShare("twitter")}>
                                            <Twitter size={20} /> Twitter
                                        </button>
                                        {/* <button onClick={() => handleSocialShare("pinterest")}>
                                            <Pinterest size={20} /> Pinterest
                                        </button> */}
                                        <button onClick={handleShare}>
                                            <MoreHorizontal size={20} /> More
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="product__features">
                            <div className="product__feature">
                                <Truck size={24} />
                                <div>
                                    <h4>Free Shipping</h4>
                                    <p>On orders over $100</p>
                                </div>
                            </div>
                            <div className="product__feature">
                                <Shield size={24} />
                                <div>
                                    <h4>Secure Payment</h4>
                                    <p>100% secure payment</p>
                                </div>
                            </div>
                            <div className="product__feature">
                                <RefreshCw size={24} />
                                <div>
                                    <h4>Easy Returns</h4>
                                    <p>14 day return policy</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="product__details">
                            <button
                                className="product__details-toggle"
                                onClick={() => setShowDescription(!showDescription)}
                            >
                                <h3>Product Details</h3>
                                {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            <AnimatePresence>
                                {showDescription && (
                                    <motion.div
                                        className="product__details-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <div className="product__details-grid">
                                            <div className="product__detail-item">
                                                <span>Category</span>
                                                <strong>{product.category}</strong>
                                            </div>
                                            <div className="product__detail-item">
                                                <span>Education Level</span>
                                                <strong>{product.education_levels}</strong>
                                            </div>
                                            <div className="product__detail-item">
                                                <span>Gender</span>
                                                <strong>{product.gender}</strong>
                                            </div>
                                            <div className="product__detail-item">
                                                <span>Available Colors</span>
                                                <strong>{product.colors.join(", ")}</strong>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <section className="related-products">
                    <h2>Related Products</h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {relatedProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Link to={`/product/${product.slug}`} className="related-product">
                                    <div className="related-product__image">
                                        <img src={product.thumbnail} alt={product.name} />
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p>${product.price.toFixed(2)}</p>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </div>
        </motion.section>
    );
}

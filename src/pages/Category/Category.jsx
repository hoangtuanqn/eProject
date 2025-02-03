import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { DoorClosedIcon as CloseIcon, FilterIcon } from "lucide-react";

import productData from "../../data/product.json";
import NotData from "../../components/NotData";
import "../../styles/category.css";

export default function Category({ nameCategory }) {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [openCategories, setOpenCategories] = useState({
        availability: true,
        price: true,
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [priceInputs, setPriceInputs] = useState({ min: "", max: "" });

    // Điều hướng đến trang 404 nếu nameCategory là "404"
    useEffect(() => {
        if (nameCategory === "404") {
            navigate("/404", { replace: true });
        }
    }, [nameCategory, navigate]);

    // Tính toán dữ liệu sản phẩm dựa trên nameCategory
    const data = useMemo(() => {
        if (nameCategory === "All Product") return productData;
        return productData.filter((product) => product.category === nameCategory);
    }, [nameCategory]);

    const [filteredProducts, setFilteredProducts] = useState(data);
    const [sortOption, setSortOption] = useState("featured");
    const [displayColumns, setDisplayColumns] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(12);

    // Hàm để mở/tắt các danh mục bộ lọc
    const toggleCategory = useCallback((category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    }, []);

    // Helper function to get minimum price from models
    const getMinPrice = useCallback((product) => {
        if (!product.models) return product.price;
        return Math.min(...Object.values(product.models).map((model) => model.price));
    }, []);

    // Sửa lại hàm calculateSalePrice và thêm hàm calculateOriginalPrice
    const calculateOriginalPrice = useCallback((finalPrice, salePercentage) => {
        if (!salePercentage) return finalPrice;
        // Ví dụ: finalPrice = 100, sale = 50%
        // => originalPrice = 100 / (1 - 0.5) = 100 / 0.5 = 200
        return finalPrice / (1 - salePercentage / 100);
    }, []);

    const calculateSalePrice = useCallback((originalPrice, salePercentage) => {
        if (!salePercentage) return originalPrice;
        return originalPrice * (1 - salePercentage / 100);
    }, []);

    // Hàm để lọc sản phẩm dựa trên các bộ lọc đã chọn
    const filterProducts = useCallback(() => {
        const filtered = data.filter((product) => {
            const minPrice = getMinPrice(product);
            const priceMatch = minPrice >= priceRange.min && minPrice <= (priceRange.max || Infinity);
            const availabilityMatch =
                selectedAvailability.length === 0 ||
                (selectedAvailability.includes("In stock") && product.quantity > 0) ||
                (selectedAvailability.includes("Out of stock") && product.quantity === 0);
            return priceMatch && availabilityMatch;
        });

        const sortedFiltered = [...filtered];

        switch (sortOption) {
            case "price_low_high":
                sortedFiltered.sort((a, b) => getMinPrice(a) - getMinPrice(b));
                break;
            case "price_high_low":
                sortedFiltered.sort((a, b) => getMinPrice(b) - getMinPrice(a));
                break;
            case "az":
                sortedFiltered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "za":
                sortedFiltered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProducts(sortedFiltered);
    }, [data, priceRange, selectedAvailability, sortOption, getMinPrice]);

    // Gọi hàm filterProducts mỗi khi các bộ lọc thay đổi
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    // Đặt lại trang hiện tại về 0 mỗi khi danh sách sản phẩm được lọc thay đổi
    useEffect(() => {
        setCurrentPage(0);
    }, [filteredProducts, itemsPerPage]);

    // Hàm để thay đổi tùy chọn sắp xếp
    const handleSortChange = useCallback((e) => {
        setSortOption(e.target.value);
    }, []);

    // Hàm để chọn tình trạng sẵn có
    const handleSelectAvailability = useCallback((availability) => {
        setSelectedAvailability((prev) =>
            prev.includes(availability) ? prev.filter((a) => a !== availability) : [...prev, availability],
        );
    }, []);

    // Hàm để thay đổi số cột hiển thị
    const handleColumnChange = useCallback((columns) => {
        setDisplayColumns(columns);
    }, []);

    // Hàm để mở/tắt bộ lọc trên di động
    const handleApplyPriceFilter = useCallback(() => {
        const min = priceInputs.min === "" ? 0 : Number(priceInputs.min);
        const max = priceInputs.max === "" ? Infinity : Number(priceInputs.max);
        setPriceRange({ min, max });
    }, [priceInputs]);

    const toggleMobileFilter = useCallback(() => {
        if (isMobileFilterOpen) {
            handleApplyPriceFilter();
        }
        setIsMobileFilterOpen((prev) => !prev);
        document.body.style.overflow = !isMobileFilterOpen ? "hidden" : "";
    }, [isMobileFilterOpen, handleApplyPriceFilter]);

    // Tính toán số lượng bộ lọc đang hoạt động
    useEffect(() => {
        const count = selectedAvailability.length;
        setActiveFiltersCount(count);
    }, [selectedAvailability]);

    // Tính toán số trang dựa trên số lượng sản phẩm đã lọc
    const pageCount = useMemo(
        () => Math.ceil(filteredProducts.length / itemsPerPage),
        [filteredProducts.length, itemsPerPage],
    );

    // Lấy các sản phẩm hiện tại dựa trên trang hiện tại
    const getCurrentItems = useCallback(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, filteredProducts]);

    // Hàm để thay đổi trang
    const handlePageChange = useCallback(({ selected }) => {
        setCurrentPage(selected);
    }, []);

    // Hàm để xử lý thay đổi kích thước cửa sổ
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setDisplayColumns(2);
            } else if (window.innerWidth <= 1024) {
                setDisplayColumns(3);
            } else {
                setDisplayColumns(4);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Hàm xử lý khi người dùng nhập giá
    const handlePriceInput = useCallback((type, value) => {
        // Chỉ cho phép nhập số
        const numericValue = value.replace(/\D/g, "");
        setPriceInputs((prev) => ({
            ...prev,
            [type]: numericValue,
        }));
    }, []);

    return (
        <section className="collections">
            <div className="container">
                <div className="collections__header">
                    <div className="collections__filter-icon">
                        <span className="collections__product-col" onClick={() => handleColumnChange(2)}>
                            <svg
                                className={displayColumns === 2 ? "collections__product--opcity" : undefined}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="3" y="4" width="2" height="15" fill="black" />
                                <rect x="7" y="4" width="2" height="15" fill="black" />
                            </svg>
                        </span>
                        <span className="collections__product-col" onClick={() => handleColumnChange(3)}>
                            <svg
                                className={displayColumns === 3 ? "collections__product--opcity" : undefined}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="2" y="4" width="2" height="15" fill="black" />
                                <rect x="6" y="4" width="2" height="15" fill="black" />
                                <rect x="10" y="4" width="2" height="15" fill="black" />
                            </svg>
                        </span>
                        <span className="collections__product-col" onClick={() => handleColumnChange(4)}>
                            <svg
                                className={displayColumns === 4 ? "collections__product--opcity" : undefined}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="2" y="4" width="2" height="15" fill="black" />
                                <rect x="6" y="4" width="2" height="15" fill="black" />
                                <rect x="10" y="4" width="2" height="15" fill="black" />
                                <rect x="14" y="4" width="2" height="15" fill="black" />
                            </svg>
                        </span>
                    </div>
                    <div className="collections__sort dfbetween">
                        <label className="sort__name">Sort by:</label>
                        <select name="sort__by" className="sort__by" onChange={handleSortChange} value={sortOption}>
                            <option value="featured">Featured</option>
                            <option value="az">Alphabetically, A-Z</option>
                            <option value="za">Alphabetically, Z-A</option>
                            <option value="price_low_high">Price, low to high</option>
                            <option value="price_high_low">Price, high to low</option>
                        </select>
                        <span className="sort__count-product">{filteredProducts.length} products</span>
                    </div>
                </div>

                <button className="mobile-filter-toggle" onClick={toggleMobileFilter}>
                    <span>
                        <FilterIcon size={16} />
                        Filter and sort
                    </span>
                </button>

                <div className={`mobile-filter-drawer ${isMobileFilterOpen ? "active" : ""}`}>
                    <div className="mobile-filter-header">
                        <h2 className="mobile-filter-title">Filter and sort</h2>
                        <button className="mobile-filter-close" onClick={toggleMobileFilter}>
                            <CloseIcon size={24} />
                        </button>
                    </div>
                    {/* Filter trên PC & Tablet */}
                    <div className="mobile-filter-content">
                        <div className="filter__category">
                            <div className="filter__category-top dfbetween">
                                <h3 className="filter__title">Sort by</h3>
                            </div>
                            <div className="filter__options">
                                <select
                                    name="sort__by"
                                    className="sort__by"
                                    onChange={handleSortChange}
                                    value={sortOption}
                                    style={{ width: "100%", marginTop: "10px" }}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="az">Alphabetically, A-Z</option>
                                    <option value="za">Alphabetically, Z-A</option>
                                    <option value="price_low_high">Price, low to high</option>
                                    <option value="price_high_low">Price, high to low</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("availability")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Availability</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.availability ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.availability && (
                                <ul className="filter__options">
                                    <li className="filter__option">
                                        <input
                                            type="checkbox"
                                            id="mobile-in-stock"
                                            className="filter__checkbox"
                                            checked={selectedAvailability.includes("In stock")}
                                            onChange={() => handleSelectAvailability("In stock")}
                                        />
                                        <label htmlFor="mobile-in-stock" className="filter__label">
                                            <span className="custom-checkbox"></span> In stock
                                        </label>
                                        <span className="filter__count">
                                            ({data.filter((item) => item.quantity > 0).length})
                                        </span>
                                    </li>
                                    <li className="filter__option">
                                        <input
                                            type="checkbox"
                                            id="mobile-out-stock"
                                            className="filter__checkbox"
                                            checked={selectedAvailability.includes("Out of stock")}
                                            onChange={() => handleSelectAvailability("Out of stock")}
                                        />
                                        <label htmlFor="mobile-out-stock" className="filter__label">
                                            <span className="custom-checkbox"></span> Out of stock
                                        </label>
                                        <span className="filter__count">
                                            ({data.filter((item) => item.quantity === 0).length})
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("price")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Price Range</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.price ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.price && (
                                <div className="filter__price-range">
                                    <div className="price-inputs">
                                        <input
                                            type="text"
                                            placeholder="₫ FROM"
                                            value={priceInputs.min}
                                            onChange={(e) => handlePriceInput("min", e.target.value)}
                                            className="price-input"
                                        />
                                        <span className="price-separator">-</span>
                                        <input
                                            type="text"
                                            placeholder="₫ TO"
                                            value={priceInputs.max}
                                            onChange={(e) => handlePriceInput("max", e.target.value)}
                                            className="price-input"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mobile-filter-footer">
                        <button
                            className="mobile-filter-apply"
                            onClick={() => {
                                handleApplyPriceFilter();
                                toggleMobileFilter();
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>

                <div className="collections__body">
                    {/* Filter trên PC & Tablet */}
                    <aside className="collections__filter">
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("availability")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Availability</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.availability ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.availability && (
                                <ul className="filter__options">
                                    <li className="filter__option">
                                        <input
                                            type="checkbox"
                                            id="in-stock"
                                            className="filter__checkbox"
                                            checked={selectedAvailability.includes("In stock")}
                                            onChange={() => handleSelectAvailability("In stock")}
                                        />
                                        <label htmlFor="in-stock" className="filter__label">
                                            <span className="custom-checkbox"></span> In stock
                                        </label>
                                        <span className="filter__count">
                                            ({data.filter((item) => item.quantity > 0).length})
                                        </span>
                                    </li>
                                    <li className="filter__option">
                                        <input
                                            type="checkbox"
                                            id="out-stock"
                                            className="filter__checkbox"
                                            checked={selectedAvailability.includes("Out of stock")}
                                            onChange={() => handleSelectAvailability("Out of stock")}
                                        />
                                        <label htmlFor="out-stock" className="filter__label">
                                            <span className="custom-checkbox"></span> Out of stock
                                        </label>
                                        <span className="filter__count">
                                            ({data.filter((item) => item.quantity === 0).length})
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("price")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Price Range</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.price ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.price && (
                                <div className="filter__price-range">
                                    <div className="price-inputs">
                                        <input
                                            type="text"
                                            placeholder="₫ FROM"
                                            value={priceInputs.min}
                                            onChange={(e) => handlePriceInput("min", e.target.value)}
                                            className="price-input"
                                        />
                                        <span className="price-separator">-</span>
                                        <input
                                            type="text"
                                            placeholder="₫ TO"
                                            value={priceInputs.max}
                                            onChange={(e) => handlePriceInput("max", e.target.value)}
                                            className="price-input"
                                        />
                                    </div>
                                    <button className="btn desktop-only" onClick={handleApplyPriceFilter}>
                                        APPLY
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>
                    <div className="collections__product">
                        {filteredProducts.length === 0 && <NotData />}

                        <div className={`collections__product-grid columns-${displayColumns} responsive-grid`}>
                            <AnimatePresence>
                                {getCurrentItems().map((item) => {
                                    const minPrice = getMinPrice(item);
                                    // Nếu có sale thì minPrice là giá đã giảm, cần tính ngược lại giá gốc
                                    const originalPrice =
                                        item.sale > 0 ? calculateOriginalPrice(minPrice, item.sale) : minPrice;
                                    const finalPrice = minPrice; // Giá hiển thị chính là minPrice (đã bao gồm giảm giá)

                                    return (
                                        <motion.article
                                            key={item.slug}
                                            className="collections__product-item"
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Link to={`/product/${item.slug}`}>
                                                <figure className="collections-product__wrapper">
                                                    {item.quantity > 0 ? (
                                                        item.sale > 0 && (
                                                            <span className="badge__sale">{item.sale}% OFF</span>
                                                        )
                                                    ) : (
                                                        <span className="badge__sale">Sold Out</span>
                                                    )}
                                                    <img
                                                        src={item.thumbnail || "/placeholder.svg"}
                                                        alt=""
                                                        className={clsx(
                                                            "collections__product-image",
                                                            item.quantity === 0 &&
                                                                "collections__product-image--opacity",
                                                        )}
                                                    />
                                                </figure>
                                                <div className="collections__product-details">
                                                    <h3 className="collections__product-name">{item.name}</h3>
                                                    <span className="collections__product-price dfcenter">
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(finalPrice)}
                                                        {item.sale > 0 && (
                                                            <span className="collections__product-price--old">
                                                                {new Intl.NumberFormat("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }).format(originalPrice)}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                        {filteredProducts.length > 20 && (
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination__link"}
                                nextLinkClassName={"pagination__link"}
                                disabledClassName={"pagination__link--disabled"}
                                activeClassName={"pagination__link--active"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

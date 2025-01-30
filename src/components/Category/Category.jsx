import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { DoorClosedIcon as CloseIcon, FilterIcon } from "lucide-react";

import productData from "../../data/product.json";
import NotData from "../NotData/NotData";
import "../../assets/css/category.css";

export default function Category({ nameCategory }) {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [selectedColors, setSelectedColors] = useState([]);
    const [openCategories, setOpenCategories] = useState({
        availability: true,
        color: true,
        size: true,
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

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
    }, [nameCategory, productData]);

    const [filteredProducts, setFilteredProducts] = useState(data);
    const [sortOption, setSortOption] = useState("featured");
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
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

    // Hàm để chọn màu sắc
    const handleSelectColor = useCallback((color) => {
        setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
    }, []);

    // Tính toán các màu sắc duy nhất từ dữ liệu sản phẩm
    const colors = useMemo(() => {
        const uniqueColors = [...new Set(data.map((item) => item.color))];
        return uniqueColors.map((color) => ({
            name: color,
            hex: data.find((item) => item.color === color)?.nameColor || color.toLowerCase(),
        }));
    }, [data]);

    // Tính toán các kích thước duy nhất từ dữ liệu sản phẩm
    const sizes = useMemo(() => {
        return [...new Set(data.map((item) => item.size))];
    }, [data]);

    // Hàm để lấy nhãn kích thước
    const getSizeLabel = useCallback((size) => {
        const sizeMap = {
            S: "Small (S)",
            M: "Medium (M)",
            L: "Large (L)",
            XL: "Extra Large (XL)",
            XXL: "Double Extra Large (XXL)",
        };
        return sizeMap[size] || size;
    }, []);

    // Hàm để lọc sản phẩm dựa trên các bộ lọc đã chọn
    const filterProducts = useCallback(() => {
        const filtered = data.filter((product) => {
            const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
            const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(product.size);
            const availabilityMatch =
                selectedAvailability.length === 0 ||
                (selectedAvailability.includes("In stock") && product.quantity > 0) ||
                (selectedAvailability.includes("Out of stock") && product.quantity === 0);
            return colorMatch && sizeMatch && availabilityMatch;
        });

        const sortedFiltered = [...filtered];

        switch (sortOption) {
            case "price_low_high":
                sortedFiltered.sort(
                    (a, b) =>
                        Number.parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
                        Number.parseFloat(b.price.replace(/[^0-9.-]+/g, "")),
                );
                break;
            case "price_high_low":
                sortedFiltered.sort(
                    (a, b) =>
                        Number.parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
                        Number.parseFloat(a.price.replace(/[^0-9.-]+/g, "")),
                );
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
    }, [data, selectedColors, selectedSizes, selectedAvailability, sortOption]);

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

    // Hàm để chọn kích thước
    const handleSelectSize = useCallback((size) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
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
    const toggleMobileFilter = useCallback(() => {
        setIsMobileFilterOpen((prev) => !prev);
        document.body.style.overflow = !isMobileFilterOpen ? "hidden" : "";
    }, [isMobileFilterOpen]);

    // Tính toán số lượng bộ lọc đang hoạt động
    useEffect(() => {
        const count = selectedColors.length + selectedSizes.length + selectedAvailability.length;
        setActiveFiltersCount(count);
    }, [selectedColors, selectedSizes, selectedAvailability]);

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
                                onClick={() => toggleCategory("color")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Color</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.color ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.color && (
                                <ul className="filter__options filter__options--color">
                                    {colors.map((color) => {
                                        const colorCount = data.filter((item) => item.color === color.name).length;
                                        const isDisabled = data.every(
                                            (item) => item.color === color.name && item.quantity === 0,
                                        );
                                        return (
                                            <li
                                                key={color.name}
                                                className={`filter__option ${
                                                    selectedColors.includes(color.name) ? "selected" : ""
                                                } ${isDisabled ? "disabled" : ""}`}
                                                onClick={() => !isDisabled && handleSelectColor(color.name)}
                                            >
                                                <span className="filter__color" style={{ backgroundColor: color.hex }}>
                                                    {selectedColors.includes(color.name) && (
                                                        <span className="filter__checkmark"></span>
                                                    )}
                                                </span>
                                                <label className="filter__label">{color.name}</label>
                                                <span className="filter__count">({colorCount})</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("size")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Size</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.size ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.size && (
                                <ul className="filter__options">
                                    {sizes.map((size) => {
                                        const sizeCount = data.filter((item) => item.size === size).length;
                                        const isDisabled = data.every(
                                            (item) => item.size === size && item.quantity === 0,
                                        );
                                        return (
                                            <li key={size} className={`filter__option ${isDisabled ? "disabled" : ""}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`mobile-size-${size}`}
                                                    className="filter__checkbox"
                                                    checked={selectedSizes.includes(size)}
                                                    onChange={() => !isDisabled && handleSelectSize(size)}
                                                    disabled={isDisabled}
                                                />
                                                <label htmlFor={`mobile-size-${size}`} className="filter__label">
                                                    <span className="custom-checkbox"></span> {getSizeLabel(size)}
                                                </label>
                                                <span className="filter__count">({sizeCount})</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="mobile-filter-footer">
                        <button className="mobile-filter-apply" onClick={toggleMobileFilter}>
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
                                onClick={() => toggleCategory("color")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Color</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.color ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.color && (
                                <ul className="filter__options filter__options--color">
                                    {colors.map((color) => {
                                        const colorCount = data.filter((item) => item.color === color.name).length;
                                        const isDisabled = data.every(
                                            (item) => item.color === color.name && item.quantity === 0,
                                        );
                                        return (
                                            <li
                                                key={color.name}
                                                className={`filter__option ${
                                                    selectedColors.includes(color.name) ? "selected" : ""
                                                } ${isDisabled ? "disabled" : ""}`}
                                                onClick={() => !isDisabled && handleSelectColor(color.name)}
                                            >
                                                <span className="filter__color" style={{ backgroundColor: color.hex }}>
                                                    {selectedColors.includes(color.name) && (
                                                        <span className="filter__checkmark"></span>
                                                    )}
                                                </span>
                                                <label className="filter__label">{color.name}</label>
                                                <span className="filter__count">({colorCount})</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("size")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Size</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={`filter__category-icon ${
                                        openCategories.size ? "rotate-up" : "rotate-down"
                                    }`}
                                />
                            </div>
                            {openCategories.size && (
                                <ul className="filter__options">
                                    {sizes.map((size) => {
                                        const sizeCount = data.filter((item) => item.size === size).length;
                                        const isDisabled = data.every(
                                            (item) => item.size === size && item.quantity === 0,
                                        );
                                        return (
                                            <li key={size} className={`filter__option ${isDisabled ? "disabled" : ""}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`size-${size}`}
                                                    className="filter__checkbox"
                                                    checked={selectedSizes.includes(size)}
                                                    onChange={() => !isDisabled && handleSelectSize(size)}
                                                    disabled={isDisabled}
                                                />
                                                <label htmlFor={`size-${size}`} className="filter__label">
                                                    <span className="custom-checkbox"></span> {getSizeLabel(size)}
                                                </label>
                                                <span className="filter__count">({sizeCount})</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </aside>
                    <div className="collections__product">
                        {filteredProducts.length === 0 && <NotData />}

                        <div className={`collections__product-grid columns-${displayColumns} responsive-grid`}>
                            <AnimatePresence>
                                {getCurrentItems().map((item) => (
                                    <motion.article
                                        key={item.slug}
                                        className="collections__product-item"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <Link to={`/product/${item.slug}`}>
                                            <figure className="collections-product__wrapper">
                                                {item.quantity > 0 ? (
                                                    item.sale && <span className="badge__sale">SALE</span>
                                                ) : (
                                                    <span className="badge__sale">Sold Out</span>
                                                )}
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt=""
                                                    className={clsx(
                                                        "collections__product-image",
                                                        item.quantity === 0 && "collections__product-image--opacity",
                                                    )}
                                                />
                                            </figure>
                                            <div className="collections__product-details">
                                                <h3 className="collections__product-name">{item.name}</h3>
                                                <span className="collections__product-price dfcenter">
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(Number.parseInt(item.price))}
                                                    {item.price_old && (
                                                        <span className="collections__product-price--old">
                                                            {new Intl.NumberFormat("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }).format(Number.parseInt(item.price_old))}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
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

import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { DoorClosedIcon as CloseIcon, FilterIcon } from "lucide-react";

import NotData from "../../components/NotData";
import "../../styles/category.css";
import productData from "../../data/product.json";
import categoriesData from "../../data/categories.json";

export default function Category({ nameCategory }) {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedEducationLevels, setSelectedEducationLevels] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [openCategories, setOpenCategories] = useState({
        category: true,
        education: true,
        price: true,
        sizes: true,
        sale: true,
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const [priceRange, setPriceRange] = useState({ min: 10, max: 999 });
    const [priceInputs, setPriceInputs] = useState({
        min: 10,
        max: 999,
    });
    const [priceRangeSlider, setPriceRangeSlider] = useState(999);
    const [selectedSale, setSelectedSale] = useState([]);

    // Thêm state tạm thời cho mobile filter
    const [tempMobileFilters, setTempMobileFilters] = useState({
        categories: [],
        sizes: [],
        educationLevels: [],
        sale: [],
        priceRange: { min: 10, max: 999 },
    });

    // Kiểm tra path và slug
    useEffect(() => {
        // Nếu path là /all-product thì không cần kiểm tra
        if (slug === "all-product") return;

        // Kiểm tra xem slug có tồn tại trong categories không
        const categoryExists = categoriesData.some((category) => category.slug === slug);
        if (!categoryExists) {
            navigate("/404", { replace: true });
        }
    }, [slug, navigate]);

    // Tự động chọn category dựa trên slug
    useEffect(() => {
        if (slug === "all-product") {
            // Không reset selected categories khi chuyển sang all-product
            return;
        } else {
            const category = categoriesData.find((cat) => cat.slug === slug);
            if (category) {
                setSelectedCategories((prev) => {
                    // Nếu category đã có trong danh sách, giữ nguyên danh sách
                    if (prev.includes(category.name)) {
                        return prev;
                    }
                    // Nếu category chưa có, thêm vào danh sách hiện tại
                    return [...prev, category.name];
                });
            }
        }
    }, [slug]);

    // Cập nhật lại data memo để phù hợp với logic mới
    const data = useMemo(() => {
        if (slug === "all-product") return productData;
        const category = categoriesData.find((cat) => cat.slug === slug);
        return category ? productData.filter((product) => product.category === category.name) : [];
    }, [slug]);

    const [filteredProducts, setFilteredProducts] = useState(data);
    const [sortOption, setSortOption] = useState("featured");
    const [displayColumns, setDisplayColumns] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(12);

    // Đồng bộ giá trị ban đầu
    useEffect(() => {
        setPriceInputs({
            min: priceRange.min,
            max: priceRange.max,
        });
    }, []); // Chỉ chạy một lần khi component mount

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

    // Định nghĩa các options
    const sizeOptions = ["S", "M", "L", "XL", "XXL"];
    const educationOptions = ["Preschool", "Elementary School", "High School", "University"];

    // Thêm handlers cho các filter mới
    const handleSizeChange = useCallback((size) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    }, []);

    const handleEducationChange = useCallback((level) => {
        setSelectedEducationLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
        );
    }, []);

    const handleCategoryChange = useCallback(
        (categoryName) => {
            if (slug !== "all-product") {
                // Nếu đang ở category cụ thể, chuyển về category/all-product
                navigate("/category/all-product");
                // Đặt timeout nhỏ để đảm bảo navigation hoàn tất trước khi cập nhật state
                setTimeout(() => {
                    setSelectedCategories((prev) => {
                        // Nếu category đã có trong danh sách, giữ nguyên danh sách
                        if (prev.includes(categoryName)) {
                            return prev;
                        }
                        // Nếu category chưa có, thêm vào danh sách hiện tại
                        return [...prev, categoryName];
                    });
                }, 0);
            } else {
                // Nếu đã ở all-product, xử lý toggle như bình thường
                setSelectedCategories((prev) =>
                    prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName],
                );
            }
        },
        [slug, navigate],
    );

    // Thêm hàm xử lý filter sale
    const handleSelectSale = (saleStatus) => {
        setSelectedSale((prev) => {
            if (prev.includes(saleStatus)) {
                return prev.filter((status) => status !== saleStatus);
            } else {
                return [...prev, saleStatus];
            }
        });
    };

    // Sửa lại phần filteredProductsList để thêm điều kiện sale
    const filteredProductsList = useMemo(() => {
        return productData.filter((product) => {
            // Lọc sản phẩm hết hàng
            if (product.quantity <= 0) return false;

            // Các điều kiện lọc hiện có
            const priceCondition = product.price >= priceRange.min && product.price <= priceRange.max;

            const sizeCondition =
                selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size));

            const educationCondition =
                selectedEducationLevels.length === 0 || selectedEducationLevels.includes(product.education_levels);

            const categoryCondition = selectedCategories.length === 0 || selectedCategories.includes(product.category);

            // Thêm điều kiện sale
            const saleCondition =
                selectedSale.length === 0 ||
                (selectedSale.includes("On Sale") && product.sale > 0) ||
                (selectedSale.includes("Regular Price") && product.sale === 0);

            return priceCondition && sizeCondition && educationCondition && categoryCondition && saleCondition;
        });
    }, [
        productData,
        priceRange,
        selectedSizes,
        selectedEducationLevels,
        selectedCategories,
        selectedSale, // Thêm selectedSale vào dependencies
    ]);

    // Update references to use filteredProductsList instead of filteredProducts
    useEffect(() => {
        setFilteredProducts(filteredProductsList);
    }, [filteredProductsList]);

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

    // Cập nhật hàm xử lý khi nhập input
    const handlePriceInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            const newValue = value === "" ? "" : Math.max(0, parseInt(value));

            setPriceInputs((prev) => ({
                ...prev,
                [name]: newValue,
            }));

            // Đồng bộ với thanh trượt
            if (name === "min") {
                const validMin = Math.min(Math.max(10, newValue), priceRange.max);
                setPriceRange((prev) => ({ ...prev, min: validMin }));
            } else {
                const validMax = Math.max(Math.min(999, newValue), priceRange.min);
                setPriceRange((prev) => ({ ...prev, max: validMax }));
            }
        },
        [priceRange],
    );

    // Thêm hàm xử lý khi blur khỏi input
    const handlePriceInputBlur = useCallback(
        (e) => {
            const { name, value } = e.target;

            // Nếu input trống, đặt lại giá trị mặc định
            if (value === "") {
                if (name === "min") {
                    setPriceInputs((prev) => ({ ...prev, min: 10 }));
                    setPriceRange((prev) => ({ ...prev, min: 10 }));
                } else {
                    setPriceInputs((prev) => ({ ...prev, max: 999 }));
                    setPriceRange((prev) => ({ ...prev, max: 999 }));
                }
                return;
            }

            const newValue = parseInt(value);

            if (name === "min") {
                // Đảm bảo min không vượt quá max và nằm trong khoảng cho phép
                const validMin = Math.min(Math.max(10, newValue), priceRange.max);
                setPriceInputs((prev) => ({ ...prev, min: validMin }));
                setPriceRange((prev) => ({ ...prev, min: validMin }));
            } else {
                // Đảm bảo max không nhỏ hơn min và nằm trong khoảng cho phép
                const validMax = Math.max(Math.min(999, newValue), priceRange.min);
                setPriceInputs((prev) => ({ ...prev, max: validMax }));
                setPriceRange((prev) => ({ ...prev, max: validMax }));
            }
        },
        [priceRange],
    );

    // Cập nhật hàm xử lý khi kéo thanh trượt
    const handlePriceRangeChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            const newValue = parseInt(value);

            // Cập nhật cả priceRange và priceInputs
            if (name === "min") {
                const validMin = Math.min(newValue, priceRange.max);
                setPriceRange((prev) => ({ ...prev, min: validMin }));
                setPriceInputs((prev) => ({ ...prev, min: validMin }));
            } else {
                const validMax = Math.max(newValue, priceRange.min);
                setPriceRange((prev) => ({ ...prev, max: validMax }));
                setPriceInputs((prev) => ({ ...prev, max: validMax }));
            }
        },
        [priceRange],
    );

    // Khởi tạo giá trị cho tempMobileFilters khi mở mobile filter
    useEffect(() => {
        if (isMobileFilterOpen) {
            setTempMobileFilters({
                categories: [...selectedCategories],
                sizes: [...selectedSizes],
                educationLevels: [...selectedEducationLevels],
                sale: [...selectedSale],
                priceRange: { ...priceRange },
            });
        }
    }, [isMobileFilterOpen]);

    // Handlers cho mobile filter
    const handleMobileCategoryChange = useCallback((categoryName) => {
        setTempMobileFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(categoryName)
                ? prev.categories.filter((c) => c !== categoryName)
                : [...prev.categories, categoryName],
        }));
    }, []);

    const handleMobileSizeChange = useCallback((size) => {
        setTempMobileFilters((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
        }));
    }, []);

    const handleMobileEducationChange = useCallback((level) => {
        setTempMobileFilters((prev) => ({
            ...prev,
            educationLevels: prev.educationLevels.includes(level)
                ? prev.educationLevels.filter((l) => l !== level)
                : [...prev.educationLevels, level],
        }));
    }, []);

    const handleMobileSaleChange = useCallback((saleStatus) => {
        setTempMobileFilters((prev) => ({
            ...prev,
            sale: prev.sale.includes(saleStatus)
                ? prev.sale.filter((s) => s !== saleStatus)
                : [...prev.sale, saleStatus],
        }));
    }, []);

    const handleMobilePriceChange = useCallback((min, max) => {
        setTempMobileFilters((prev) => ({
            ...prev,
            priceRange: { min, max },
        }));
    }, []);

    // Handler khi nhấn Apply
    const handleApplyMobileFilters = useCallback(() => {
        // Nếu đang ở category cụ thể và có thay đổi categories
        if (slug !== "all-product" && tempMobileFilters.categories.length > 0) {
            navigate("/category/all-product");
        }

        setSelectedCategories(tempMobileFilters.categories);
        setSelectedSizes(tempMobileFilters.sizes);
        setSelectedEducationLevels(tempMobileFilters.educationLevels);
        setSelectedSale(tempMobileFilters.sale);
        setPriceRange(tempMobileFilters.priceRange);

        // Đóng mobile filter drawer
        setIsMobileFilterOpen(false);
    }, [tempMobileFilters, slug, navigate]);

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
                    <div className="mobile-filter-content">
                        {/* Categories */}
                        <div className="filter__category">
                            <div className="filter__category-top">
                                <h3>Categories</h3>
                            </div>
                            <div className="filter__content">
                                {categoriesData.map((category) => (
                                    <label key={category.id} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={tempMobileFilters.categories.includes(category.name)}
                                            onChange={() => handleMobileCategoryChange(category.name)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        {category.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="filter__category">
                            <div className="filter__category-top">
                                <h3>Sizes</h3>
                            </div>
                            <div className="filter__content">
                                {sizeOptions.map((size) => (
                                    <label key={size} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={tempMobileFilters.sizes.includes(size)}
                                            onChange={() => handleMobileSizeChange(size)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        {size}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Education Levels */}
                        <div className="filter__category">
                            <div className="filter__category-top">
                                <h3>Education Levels</h3>
                            </div>
                            <div className="filter__content">
                                {educationOptions.map((level) => (
                                    <label key={level} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={tempMobileFilters.educationLevels.includes(level)}
                                            onChange={() => handleMobileEducationChange(level)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="filter__category">
                            <div className="filter__category-top">
                                <h3>Price Range</h3>
                            </div>
                            <div className="price-range">
                                <div className="price-range__inputs">
                                    <div className="price-range__input-group">
                                        <span className="price-range__currency">$</span>
                                        <input
                                            type="number"
                                            name="min"
                                            className="price-range__input-field"
                                            value={tempMobileFilters.priceRange.min}
                                            onChange={(e) =>
                                                handleMobilePriceChange(
                                                    e.target.value,
                                                    tempMobileFilters.priceRange.max,
                                                )
                                            }
                                            onBlur={handlePriceInputBlur}
                                            min="10"
                                            max="999"
                                        />
                                    </div>
                                    <span className="price-range__separator">to</span>
                                    <div className="price-range__input-group">
                                        <span className="price-range__currency">$</span>
                                        <input
                                            type="number"
                                            name="max"
                                            className="price-range__input-field"
                                            value={tempMobileFilters.priceRange.max}
                                            onChange={(e) =>
                                                handleMobilePriceChange(
                                                    tempMobileFilters.priceRange.min,
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={handlePriceInputBlur}
                                            min="10"
                                            max="999"
                                        />
                                    </div>
                                </div>
                                <div className="price-range__slider">
                                    <div className="price-range__track"></div>
                                    <div
                                        className="price-range__progress"
                                        style={{
                                            left: `${((tempMobileFilters.priceRange.min - 10) / (999 - 10)) * 100}%`,
                                            right: `${
                                                100 - ((tempMobileFilters.priceRange.max - 10) / (999 - 10)) * 100
                                            }%`,
                                        }}
                                    ></div>
                                    <input
                                        type="range"
                                        name="min"
                                        min="10"
                                        max="999"
                                        value={tempMobileFilters.priceRange.min}
                                        onChange={(e) =>
                                            handleMobilePriceChange(e.target.value, tempMobileFilters.priceRange.max)
                                        }
                                        className="price-range__input price-range__input--left"
                                    />
                                    <input
                                        type="range"
                                        name="max"
                                        min="10"
                                        max="999"
                                        value={tempMobileFilters.priceRange.max}
                                        onChange={(e) =>
                                            handleMobilePriceChange(tempMobileFilters.priceRange.min, e.target.value)
                                        }
                                        className="price-range__input price-range__input--right"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sale Status */}
                        <div className="filter__category">
                            <div className="filter__category-top">
                                <h3>Sale Status</h3>
                            </div>
                            <div className="filter__content">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={tempMobileFilters.sale.includes("On Sale")}
                                        onChange={() => handleMobileSaleChange("On Sale")}
                                    />
                                    <span className="checkbox-custom"></span>
                                    On Sale
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={tempMobileFilters.sale.includes("Regular Price")}
                                        onChange={() => handleMobileSaleChange("Regular Price")}
                                    />
                                    <span className="checkbox-custom"></span>
                                    Regular Price
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-filter-footer">
                        <button className="mobile-filter-apply" onClick={handleApplyMobileFilters}>
                            Apply
                        </button>
                    </div>
                </div>

                <div className="collections__body">
                    {/* Filter trên PC & Tablet */}
                    <aside className="collections__filter">
                        {/* Categories - Đặt đầu tiên vì đây là cách phân loại tổng quát nhất */}
                        <div className="filter__group">
                            <div className="filter__header" onClick={() => toggleCategory("category")}>
                                <h3>Categories</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.category,
                                    })}
                                />
                            </div>
                            {openCategories.category && (
                                <div className="filter__content">
                                    {categoriesData.map((category) => (
                                        <label
                                            key={category.id}
                                            className={clsx("checkbox-label", {
                                                active: selectedCategories.includes(category.name),
                                            })}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.name)}
                                                onChange={() => handleCategoryChange(category.name)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {category.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Education Level - Quan trọng thứ hai vì liên quan đến mục đích sử dụng */}
                        <div className="filter__group">
                            <div className="filter__header" onClick={() => toggleCategory("education")}>
                                <h3>Education Level</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.education,
                                    })}
                                />
                            </div>
                            {openCategories.education && (
                                <div className="filter__content">
                                    {educationOptions.map((level) => (
                                        <label key={level} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedEducationLevels.includes(level)}
                                                onChange={() => handleEducationChange(level)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {level}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Range - Yếu tố quan trọng trong quyết định mua hàng */}
                        <div className="filter__group">
                            <div className="filter__header" onClick={() => toggleCategory("price")}>
                                <h3>Price Range</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", { "filter__icon--active": openCategories.price })}
                                />
                            </div>
                            {openCategories.price && (
                                <div className="price-range">
                                    <div className="price-range__inputs">
                                        <div className="price-range__input-group">
                                            <span className="price-range__currency">$</span>
                                            <input
                                                type="number"
                                                name="min"
                                                className="price-range__input-field"
                                                value={priceInputs.min}
                                                onChange={handlePriceInputChange}
                                                onBlur={handlePriceInputBlur}
                                                min="10"
                                                max="999"
                                            />
                                        </div>
                                        <span className="price-range__separator">to</span>
                                        <div className="price-range__input-group">
                                            <span className="price-range__currency">$</span>
                                            <input
                                                type="number"
                                                name="max"
                                                className="price-range__input-field"
                                                value={priceInputs.max}
                                                onChange={handlePriceInputChange}
                                                onBlur={handlePriceInputBlur}
                                                min="10"
                                                max="999"
                                            />
                                        </div>
                                    </div>
                                    <div className="price-range__slider">
                                        <div className="price-range__track"></div>
                                        <div
                                            className="price-range__progress"
                                            style={{
                                                left: `${((priceRange.min - 10) / (999 - 10)) * 100}%`,
                                                right: `${100 - ((priceRange.max - 10) / (999 - 10)) * 100}%`,
                                            }}
                                        ></div>
                                        <input
                                            type="range"
                                            name="min"
                                            min="10"
                                            max="999"
                                            value={priceRange.min}
                                            onChange={handlePriceRangeChange}
                                            className="price-range__input price-range__input--left"
                                        />
                                        <input
                                            type="range"
                                            name="max"
                                            min="10"
                                            max="999"
                                            value={priceRange.max}
                                            onChange={handlePriceRangeChange}
                                            className="price-range__input price-range__input--right"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sizes - Thông tin kỹ thuật của sản phẩm */}
                        <div className="filter__group">
                            <div className="filter__header" onClick={() => toggleCategory("sizes")}>
                                <h3>Sizes</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", { "filter__icon--active": openCategories.sizes })}
                                />
                            </div>
                            {openCategories.sizes && (
                                <div className="filter__content">
                                    {sizeOptions.map((size) => (
                                        <label key={size} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedSizes.includes(size)}
                                                onChange={() => handleSizeChange(size)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sale Status - Đặt cuối cùng */}
                        <div className="filter__group">
                            <div className="filter__header" onClick={() => toggleCategory("sale")}>
                                <h3>Sale Status</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", { "filter__icon--active": openCategories.sale })}
                                />
                            </div>
                            {openCategories.sale && (
                                <div className="filter__content">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedSale.includes("On Sale")}
                                            onChange={() => handleSelectSale("On Sale")}
                                        />
                                        <span className="checkbox-custom"></span>
                                        On Sale
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedSale.includes("Regular Price")}
                                            onChange={() => handleSelectSale("Regular Price")}
                                        />
                                        <span className="checkbox-custom"></span>
                                        Regular Price
                                    </label>
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
                                                        {new Intl.NumberFormat("en-US", {
                                                            style: "currency",
                                                            currency: "USD",
                                                        }).format(finalPrice)}
                                                        {item.sale > 0 && (
                                                            <span className="collections__product-price--old">
                                                                {new Intl.NumberFormat("en-US", {
                                                                    style: "currency",
                                                                    currency: "USD",
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

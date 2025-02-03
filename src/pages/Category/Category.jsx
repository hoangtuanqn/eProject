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
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [openCategories, setOpenCategories] = useState({
        category: true,
        education: true,
        price: true,
        sizes: true,
        sale: true,
        gender: true,
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

    // Thêm các state tạm thời cho mobile
    const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
    const [tempSelectedEducationLevels, setTempSelectedEducationLevels] = useState([]);
    const [tempSelectedSizes, setTempSelectedSizes] = useState([]);
    const [tempSelectedSale, setTempSelectedSale] = useState([]);
    const [tempSelectedGenders, setTempSelectedGenders] = useState([]);
    const [tempPriceRange, setTempPriceRange] = useState({ min: 10, max: 999 });
    const [tempSortOption, setTempSortOption] = useState("featured");

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

    const [filteredProductsList, setFilteredProductsList] = useState(data);
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

    // Thêm useEffect để đồng bộ giá trị ban đầu khi mở mobile filter
    useEffect(() => {
        if (isMobileFilterOpen) {
            setTempSelectedCategories(selectedCategories);
            setTempSelectedEducationLevels(selectedEducationLevels);
            setTempSelectedSizes(selectedSizes);
            setTempSelectedSale(selectedSale);
            setTempSelectedGenders(selectedGenders);
            setTempPriceRange(priceRange);
            setTempSortOption(sortOption);
        }
    }, [
        isMobileFilterOpen,
        selectedCategories,
        selectedEducationLevels,
        selectedSizes,
        selectedSale,
        selectedGenders,
        priceRange,
        sortOption,
    ]);

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
    const genderOptions = ["Female", "Male", "Unisex"];

    // Thêm handlers cho các filter mới
    const handleSizeChange = useCallback((size) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    }, []);

    const handleEducationChange = useCallback((level) => {
        setSelectedEducationLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
        );
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        );
    }, []);

    const handleGenderChange = useCallback((gender) => {
        setSelectedGenders((prev) => (prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]));
    }, []);

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

    // Cập nhật lại hàm sắp xếp
    const sortProducts = useCallback((products, option) => {
        const sortedProducts = [...products];
        switch (option) {
            case "az":
                return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            case "za":
                return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            case "price_low_high":
                return sortedProducts.sort((a, b) => a.price - b.price);
            case "price_high_low":
                return sortedProducts.sort((a, b) => b.price - a.price);
            default: // "featured"
                return sortedProducts;
        }
    }, []);

    // Cập nhật useEffect để áp dụng sort
    useEffect(() => {
        const sorted = sortProducts(filteredProductsList, sortOption);
        setFilteredProductsList(sorted);
    }, [filteredProductsList, sortOption, sortProducts]);

    // Cập nhật handler cho PC sort
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
        () => Math.ceil(filteredProductsList.length / itemsPerPage),
        [filteredProductsList.length, itemsPerPage],
    );

    // Lấy các sản phẩm hiện tại dựa trên trang hiện tại
    const getCurrentItems = useCallback(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredProductsList.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, filteredProductsList]);

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

    // Sửa lại các handlers cho mobile
    const handleMobileCategoryChange = (category) => {
        setTempSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        );
    };

    const handleMobileEducationChange = (level) => {
        setTempSelectedEducationLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
        );
    };

    const handleMobileSizeChange = (size) => {
        setTempSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    };

    const handleMobileSale = (saleStatus) => {
        setTempSelectedSale((prev) => {
            if (prev.includes(saleStatus)) {
                return prev.filter((status) => status !== saleStatus);
            } else {
                return [...prev, saleStatus];
            }
        });
    };

    const handleMobileGenderChange = (gender) => {
        setTempSelectedGenders((prev) =>
            prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender],
        );
    };

    const handleMobilePriceInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === "" ? "" : Math.max(0, parseInt(value));

        setTempPriceRange((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleMobileSortChange = (e) => {
        setTempSortOption(e.target.value);
    };

    // Cập nhật lại phần filter products để đảm bảo tất cả điều kiện hoạt động đúng
    const filteredProducts = useMemo(() => {
        return productData.filter((product) => {
            // Điều kiện category
            const categoryCondition = selectedCategories.length === 0 || selectedCategories.includes(product.category);

            // Điều kiện gender
            const genderCondition = selectedGenders.length === 0 || selectedGenders.includes(product.gender);

            // Điều kiện education level
            const educationCondition =
                selectedEducationLevels.length === 0 || selectedEducationLevels.includes(product.education_levels);

            // Điều kiện price range
            const priceCondition = product.price >= priceRange.min && product.price <= priceRange.max;

            // Điều kiện size
            const sizeCondition =
                selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size));

            // Điều kiện sale
            const saleCondition =
                selectedSale.length === 0 ||
                (selectedSale.includes("On Sale") && product.sale > 0) ||
                (selectedSale.includes("Regular Price") && product.sale === 0);

            // Trả về true nếu tất cả điều kiện đều thỏa mãn
            return (
                categoryCondition &&
                genderCondition &&
                educationCondition &&
                priceCondition &&
                sizeCondition &&
                saleCondition
            );
        });
    }, [
        productData,
        selectedCategories,
        selectedGenders,
        selectedEducationLevels,
        priceRange,
        selectedSizes,
        selectedSale,
    ]);

    // Đặt lại trang hiện tại về 0 mỗi khi danh sách sản phẩm được lọc thay đổi
    useEffect(() => {
        setCurrentPage(0);
    }, [filteredProducts, itemsPerPage]);

    // Cập nhật lại mobile filter apply
    const handleApplyMobileFilters = () => {
        setSelectedCategories(tempSelectedCategories);
        setSelectedEducationLevels(tempSelectedEducationLevels);
        setSelectedSizes(tempSelectedSizes);
        setSelectedSale(tempSelectedSale);
        setSelectedGenders(tempSelectedGenders);
        setPriceRange(tempPriceRange);
        setSortOption(tempSortOption);
        toggleMobileFilter();
    };

    return (
        <section className="collections">
            <div className="container">
                <div className="collections__header">
                    <h2 className="collections__title">{nameCategory}</h2>
                    <div className="collections__sort dfcenter">
                        <span className="sort__name">Sort by:</span>
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
                        {/* Sort by */}
                        <div className="filter__category">
                            <div className="filter__category-top dfbetween">
                                <h3 className="filter__title">Sort by</h3>
                            </div>
                            <div className="filter__options">
                                <select
                                    name="sort__by"
                                    className="sort__by"
                                    onChange={handleMobileSortChange}
                                    value={tempSortOption}
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

                        {/* Categories */}
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("category")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Categories</h3>
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
                                        <label key={category.id} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedCategories.includes(category.name)}
                                                onChange={() => handleMobileCategoryChange(category.name)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {category.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Education Level */}
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("education")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Education Level</h3>
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
                                                checked={tempSelectedEducationLevels.includes(level)}
                                                onChange={() => handleMobileEducationChange(level)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {level}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Range */}
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
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.price,
                                    })}
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
                                                value={tempPriceRange.min}
                                                onChange={handleMobilePriceInputChange}
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
                                                value={tempPriceRange.max}
                                                onChange={handleMobilePriceInputChange}
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
                                                left: `${((tempPriceRange.min - 10) / (999 - 10)) * 100}%`,
                                                right: `${100 - ((tempPriceRange.max - 10) / (999 - 10)) * 100}%`,
                                            }}
                                        ></div>
                                        <input
                                            type="range"
                                            name="min"
                                            min="10"
                                            max="999"
                                            value={tempPriceRange.min}
                                            onChange={handlePriceRangeChange}
                                            className="price-range__input price-range__input--left"
                                        />
                                        <input
                                            type="range"
                                            name="max"
                                            min="10"
                                            max="999"
                                            value={tempPriceRange.max}
                                            onChange={handlePriceRangeChange}
                                            className="price-range__input price-range__input--right"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sizes */}
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("sizes")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Sizes</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.sizes,
                                    })}
                                />
                            </div>
                            {openCategories.sizes && (
                                <div className="filter__content">
                                    {sizeOptions.map((size) => (
                                        <label key={size} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedSizes.includes(size)}
                                                onChange={() => handleMobileSizeChange(size)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sale Status */}
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("sale")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Sale Status</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.sale,
                                    })}
                                />
                            </div>
                            {openCategories.sale && (
                                <div className="filter__content">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={tempSelectedSale.includes("On Sale")}
                                            onChange={() => handleMobileSale("On Sale")}
                                        />
                                        <span className="checkbox-custom"></span>
                                        On Sale
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={tempSelectedSale.includes("Regular Price")}
                                            onChange={() => handleMobileSale("Regular Price")}
                                        />
                                        <span className="checkbox-custom"></span>
                                        Regular Price
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="filter__category">
                            <div
                                className="filter__category-top dfbetween"
                                onClick={() => toggleCategory("gender")}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="filter__title">Gender</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.gender,
                                    })}
                                />
                            </div>
                            {openCategories.gender && (
                                <div className="filter__content">
                                    {genderOptions.map((gender) => (
                                        <label key={gender} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedGenders.includes(gender)}
                                                onChange={() => handleMobileGenderChange(gender)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {gender}
                                        </label>
                                    ))}
                                </div>
                            )}
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
                                        <label key={category.id} className="checkbox-label">
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

                        {/* Gender Filter */}
                        <div className="filter__group">
                            <div className="filter__header" onClick={() => toggleCategory("gender")}>
                                <h3>Gender</h3>
                                <img
                                    src="/assets/icon/chevron-top.svg"
                                    alt=""
                                    className={clsx("filter__icon", {
                                        "filter__icon--active": openCategories.gender,
                                    })}
                                />
                            </div>
                            {openCategories.gender && (
                                <div className="filter__content">
                                    {genderOptions.map((gender) => (
                                        <label key={gender} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenders.includes(gender)}
                                                onChange={() => handleGenderChange(gender)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            {gender}
                                        </label>
                                    ))}
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

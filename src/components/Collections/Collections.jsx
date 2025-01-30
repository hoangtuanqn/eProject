/**
 * Component Collections
 *
 * Chức năng chính:
 * 1. Hiển thị danh sách sản phẩm
 * 2. Lọc sản phẩm theo màu sắc, kích thước và tình trạng còn hàng
 * 3. Sắp xếp sản phẩm theo các tiêu chí khác nhau
 * 4. Thay đổi số cột hiển thị sản phẩm
 * 5. Phân trang danh sách sản phẩm
 */

import { useState, useEffect, useMemo } from "react";
import data from "../../data/collections.json";
import "../../assets/css/collections.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion";

export default function Collections() {
    const [selectedColors, setSelectedColors] = useState([]); // Lưu trữ các màu sắc được chọn
    const [openCategories, setOpenCategories] = useState({
        availability: true,
        color: true,
        size: true,
    }); // Quản lý trạng thái mở/đóng của các danh mục lọc
    const [filteredProducts, setFilteredProducts] = useState(data); // Lưu trữ danh sách sản phẩm sau khi lọc
    const [sortOption, setSortOption] = useState("featured"); // Lưu trữ tùy chọn sắp xếp hiện tại
    const [selectedSizes, setSelectedSizes] = useState([]); // Lưu trữ các kích thước được chọn
    const [selectedAvailability, setSelectedAvailability] = useState([]); // Lưu trữ tình trạng còn hàng được chọn
    const [displayColumns, setDisplayColumns] = useState(4); // Số cột hiển thị sản phẩm
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại cho phân trang
    const [itemsPerPage] = useState(12); // Số sản phẩm trên mỗi trang

    // Hàm này mở/đóng các danh mục lọc (màu sắc, kích thước, tình trạng còn hàng)
    const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    // Hàm này thêm/xóa màu sắc được chọn
    const handleSelectColor = (color) => {
        setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
    };

    // Sử dụng useMemo để tối ưu hóa việc tạo danh sách màu sắc
    const colors = useMemo(() => {
        const uniqueColors = [...new Set(data.map((item) => item.color))];
        return uniqueColors.map((color) => ({
            name: color,
            hex: data.find((item) => item.color === color)?.nameColor || color.toLowerCase(),
        }));
    }, []);

    // Sử dụng useMemo để tối ưu hóa việc tạo danh sách kích thước
    const sizes = useMemo(() => {
        return [...new Set(data.map((item) => item.size))];
    }, []);

    const getSizeLabel = (size) => {
        const sizeMap = {
            S: "Small (S)",
            M: "Medium (M)",
            L: "Large (L)",
            XL: "Extra Large (XL)",
            XXL: "Double Extra Large (XXL)",
        };
        return sizeMap[size] || size;
    };

    // Hàm này lọc và sắp xếp sản phẩm dựa trên các tiêu chí đã chọn
    const filterProducts = () => {
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
    };

    // useEffect này gọi hàm filterProducts mỗi khi các tiêu chí lọc hoặc sắp xếp thay đổi
    useEffect(() => {
        filterProducts();
    }, [selectedColors, selectedSizes, selectedAvailability, sortOption, data]);

    // useEffect này đặt lại trang hiện tại về 0 mỗi khi danh sách sản phẩm đã lọc thay đổi
    useEffect(() => {
        setCurrentPage(0);
    }, [filteredProducts]);

    // Hàm này xử lý việc thay đổi tùy chọn sắp xếp
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Hàm này thêm/xóa kích thước được chọn
    const handleSelectSize = (size) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    };

    // Hàm này thêm/xóa tình trạng còn hàng được chọn
    const handleSelectAvailability = (availability) => {
        setSelectedAvailability((prev) =>
            prev.includes(availability) ? prev.filter((a) => a !== availability) : [...prev, availability],
        );
    };

    // Hàm này thay đổi số cột hiển thị sản phẩm
    const handleColumnChange = (columns) => {
        setDisplayColumns(columns);
    };

    // Tính toán số trang dựa trên số lượng sản phẩm đã lọc và số sản phẩm trên mỗi trang
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    // Hàm này lấy các sản phẩm cho trang hiện tại
    const getCurrentItems = () => {
        const startIndex = currentPage * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    };

    // Hàm này xử lý việc thay đổi trang
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <section className="collections">
            <div className="container">
                <div className="collections__header">
                    <div className="collections__filter-icon">
                        <span className="collections__product-col" onClick={() => handleColumnChange(2)}>
                            <svg
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
                            <option value="best_selling">Best selling</option>
                            <option value="az">Alphabetically, A-Z</option>
                            <option value="za">Alphabetically, Z-A</option>
                            <option value="price_low_high">Price, low to high</option>
                            <option value="price_high_low">Price, high to low</option>
                            <option value="date_old_new">Date, old to new</option>
                            <option value="date_new_old">Date, new to old</option>
                        </select>
                        <span className="sort__count-product">{filteredProducts.length} products</span>
                    </div>
                </div>
                <div className="collections__body">
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
                        <div className={`collections__product-grid columns-${displayColumns}`}>
                            <AnimatePresence>
                                {getCurrentItems().map((item) => (
                                    <motion.article
                                        key={item.id}
                                        className="collections__product-item"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <Link to={`/product/${item.id}`}>
                                            <figure className="collections-product__wrapper">
                                                {item.sale && <span className="badge__sale">SALE</span>}
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt=""
                                                    className="collections__product-image"
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

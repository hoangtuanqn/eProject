// Import Library
import { useLayoutEffect } from "react";
// Router dom
import { Routes, Route, useLocation } from "react-router-dom";

import "./assets/css/reset.css"; // Reset css
import "./assets/css/global.css"; // CSS Common

// Import Page
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import Policies from "./components/Policies";
import NotFound from "./components/NotFound";
import Category from "./components/Category";
import Categories from "./components/Categories";
import Product from "./components/Product";

const App = () => {
    // Start: Xử lý cuộn lên đầu trang khi chuyển trang
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname]);
    // End: xử lý cuộn lên đầu trang khi chuyển trang

    return (
        <>
            <Routes>
                {/* HomePage */}
                <Route path="/" element={<HomePage />} exact />

                {/* Trang tìm kiếm */}
                <Route path="/pages/search" element={<Search />} exact />

                {/* Trang chính sác đổi trả sản phẩm */}
                <Route path="/pages/policies" element={<Policies />} exact />

                {/* Danh mục product*/}
                <Route path="/categories" element={<Categories />} exact />

                {/* Sản phẩm product theo từng danh mục*/}
                <Route path="/category/:slug" element={<Category />} />

                {/* Hiển thị 1 sản phẩm */}
                <Route path="/product/:slug" element={<Product />} />

                {/* Page Error - 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;

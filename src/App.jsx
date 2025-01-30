// Import Library

import { useEffect, useLayoutEffect, useState } from "react";
// Router dom
import { Routes, Route, useLocation } from "react-router-dom";

import "./assets/css/reset.css"; // Reset css
import "./assets/css/global.css"; // CSS Common

// Import Page
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import Policies from "./components/Policies";
import NotFound from "./components/NotFound";
import Collections from "./components/Collections";

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
                {/* <Route path="/collections" element={<Policies />} exact /> */}

                {/* Sản phẩm product theo từng danh mục*/}
                <Route path="/collections" element={<Collections />} />

                {/* Page Error - 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;

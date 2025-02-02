// Import Library
import { useLayoutEffect } from "react";
// Router dom
import { Routes, Route, useLocation } from "react-router-dom";

import "./assets/css/reset.css"; // Reset css
import "./assets/css/global.css"; // CSS Common

// Import Page
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import Policies from "./components/Policies";
import NotFound from "./components/NotFound";
import Category from "./components/Category";
import Categories from "./components/Categories";
import Product from "./components/Product";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
// import Team from "./components/Team";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/Gallery";
import Partners from "./components/Partners";

const App = () => {
    // Start: Xử lý cuộn lên đầu trang khi chuyển trang
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname]);
    // End: xử lý cuộn lên đầu trang khi chuyển trang

    return (
        <>
            <Header />
            <Routes>
                {/* HomePage */}
                <Route path="/" element={<HomePage />} exact />

                {/* Trang tìm kiếm */}
                <Route path="/pages/search" element={<Search />} exact />

                {/* Trang chính sác đổi trả sản phẩm */}
                <Route path="/pages/policies" element={<Policies />} exact />

                {/* Page Contact */}
                <Route path="/pages/contact" element={<Contact />} />

                {/* Page FAQ */}
                <Route path="/pages/faq" element={<Faq />} />

                {/* Page Team */}
                {/* <Route path="/pages/team" element={<Team />} /> */}

                {/* Page About Us */}
                <Route path="/pages/about" element={<AboutUs />} />

                {/* Page Gallery */}
                <Route path="/pages/gallery" element={<Gallery />} />

                {/* Page Partners */}
                <Route path="/pages/partners" element={<Partners />} />

                {/* Danh mục product*/}
                <Route path="/categories" element={<Categories />} exact />

                {/* Sản phẩm product theo từng danh mục*/}
                <Route path="/category/:slug" element={<Category />} />

                {/* Hiển thị 1 sản phẩm */}
                <Route path="/product/:slug" element={<Product />} />

                {/* Page Error - 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;

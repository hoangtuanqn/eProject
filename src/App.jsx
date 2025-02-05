// Import Library
import { useLayoutEffect } from "react";
// Router dom
import { Routes, Route, useLocation } from "react-router-dom";

import "./styles/reset.css"; // Reset css
import "./styles/global.css"; // CSS Common

// Import Page
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Partners from "./pages/Partners";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import CheckOuts from "./pages/CheckOuts";

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
                <Route path="/pages/contact" element={<Contact />} exact />

                {/* Page FAQ */}
                <Route path="/pages/faq" element={<Faq />} exact />

                {/* Page About Us */}
                <Route path="/pages/about" element={<AboutUs />} exact />

                {/* Page Gallery */}
                <Route path="/pages/gallery" element={<Gallery />} exact />

                {/* Page Partners */}
                <Route path="/pages/partners" element={<Partners />} exact />

                {/* Page WishList */}
                <Route path="/pages/wishlist" element={<WishList />} exact />

                {/* Danh mục product*/}
                <Route path="/categories" element={<Categories />} exact />

                {/* Sản phẩm product theo từng danh mục*/}
                <Route path="/category/:slug" element={<Category />} exact />

                {/* Hiển thị 1 sản phẩm */}
                <Route path="/product/:slug" element={<Product />} exact />

                {/* Trang giỏ hàng */}
                <Route path="/cart" element={<Cart />} exact />

                {/* Trang thanh toán */}
                <Route path="/checkouts" element={<CheckOuts />} exact />

                {/* Page Error - 404 */}
                <Route path="*" element={<NotFound />} exact />
            </Routes>

            <Footer />
        </>
    );
};

export default App;

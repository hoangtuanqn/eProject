// Import Component
import { useEffect } from "react";

import Gradient from "./Gradient";
import Header from "../Common/Header";
import Hero from "./Hero";
import CategoryHighlights from "./CategoryHighlights";
import FeaturedProducts from "./FeaturedProducts";
import Marquee from "./Marquee";
import BestSales from "./BestSales";
import BrandLogos from "./BrandLogos";
import VideoPromo from "./VideoPromo";
import Testimonial from "./Testimonial";
import BlogPosts from "./BlogPosts";
import Footer from "../Common/Footer";

// Library
// AOS
import AOS from "aos";
import "aos/dist/aos.css"; // Import file CSS của AOS

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 2500,
            anchorPlacement: "top-bottom",
            once: true,
        });
    }, []);
    return (
        <>
            <Gradient />
            <Header />
            {/* Main Content */}
            <main className="main">
                <Hero />
                <CategoryHighlights />
                <FeaturedProducts />
                <Marquee />
                <BestSales />
                <BrandLogos />
                <VideoPromo />
                <Testimonial />
                <BlogPosts />
            </main>
            <Footer />
        </>
    );
};

export default App;

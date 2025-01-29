// Import Library
// AOS
import AOS from "aos";
import "aos/dist/aos.css"; // Import file CSS của AOS

// Router dom
import { Routes, Route, Link } from "react-router-dom";

// Import Page
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";

// Import CSS
import "./assets/css/reset.css"; // Reset css
import "./assets/css/global.css"; // CSS Common
import Search from "./components/Search";

const App = () => {
    return (
        <>
            <Routes>
                {/* HomePage */}
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<Search />} />

                {/* Page Error - 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;

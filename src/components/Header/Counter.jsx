import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import axios from "axios";

export default function Counter() {
    const [counterVisited, setCounterVisited] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hàm lấy dữ liệu lượt truy cập từ API
    const fetchCounterVisited = async () => {
        try {
            const { data } = await axios.get("https://679c72d387618946e65238ce.mockapi.io/api/v1/user_visited/1");
            return data.counter_visited;
        } catch (error) {
            console.error("Error fetching counter visited:", error);
            return null;
        }
    };



    // useEffect để lấy và cập nhật bộ đếm khi trang được truy cập
    useEffect(() => {


        // Xóa Comment là hoạt động lại
        // handleVisit(); // Gọi hàm xử lý khi trang load
    }, []);

    // Hàm cập nhật số người dùng mới nhất khi click vào .header__counter
    const handleCounterClick = async () => {
        setLoading(true);
        const currentCount = await fetchCounterVisited(); // Lấy số lượt truy cập hiện tại
        if (currentCount !== null) {
            setCounterVisited(currentCount); // Cập nhật state với số mới nhất
        }
        setLoading(false);
    };
    return (
        <button className="header__icon-wrap dfbetween">
            <Users className="header__icon" size={36} />
            {loading ? (
                <img src={`${process.env.REACT_APP_BASE_URL}/assets/icon/loading.gif`} className="header__loading" alt="Loading..." />
            ) : (
                <span className="header__counter" onClick={handleCounterClick}>{`${counterVisited} Visitors`}</span>
            )}
        </button>
    );
}

// Hàm mở menu/search chung
export const openMenu = (target) => {
    if (target.current) {
        target.current.classList.add("active");
        document.body.style.overflow = "hidden"; // Ngăn cuộn trang
    }
};

// Hàm đóng menu/search với animation
export const closeWithAnimation = (target) => {
    if (target.current) {
        target.current.classList.add("closing");
        document.body.style.overflow = ""; // Reset overflow ngay lập tức
        setTimeout(() => {
            if (target.current) {
                target.current.classList.remove("active", "closing");
            }
        }, 500);
    }
};

// Hàm xử lý đóng khi click outside
export const handleClickOutside = (e, target, closeCallback) => {
    if (target.current && e.target === target.current) {
        closeCallback();
    }
};

// Hàm xử lý submenu
export const toggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const menuItem = e.currentTarget.closest("li");
    if (!menuItem) return;

    const parentUl = menuItem.closest("ul");
    const isMainMenu = parentUl.classList.contains("mobile-menu__list");

    // Đóng tất cả submenu cùng cấp
    const siblings = parentUl.children;
    Array.from(siblings).forEach((sibling) => {
        if (sibling !== menuItem) {
            sibling.classList.remove("active");
        }
    });

    // Toggle active class cho menu item hiện tại
    menuItem.classList.toggle("active");
};

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

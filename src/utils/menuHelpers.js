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
        setTimeout(() => {
            if (target.current) {
                target.current.classList.remove("active", "closing");
                document.body.style.overflow = ""; // Cho phép cuộn trang
            }
        }, 500); // Thời gian animation: 0.5s
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

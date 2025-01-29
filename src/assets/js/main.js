document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuClose = document.querySelector(".mobile-menu__close");
    const menuLinks = document.querySelectorAll(".mobile-menu__link[data-submenu]");

    // Hàm mở/đóng menu
    function toggleMenu() {
        if (!mobileMenu.classList.contains("active")) {
            // Mở menu
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden"; // Ngăn cuộn trang khi menu mở
        } else {
            // Đóng menu với animation
            closeMenuWithAnimation();
        }
    }

    // Hàm đóng menu với animation
    function closeMenuWithAnimation() {
        // Thêm class closing để kích hoạt animation đóng menu
        mobileMenu.classList.add("closing");

        // Sau khi animation kết thúc, xóa class active và closing
        setTimeout(() => {
            mobileMenu.classList.remove("active", "closing");
            document.body.style.overflow = ""; // Cho phép cuộn trang lại
        }, 500); // Thời gian phải khớp với thời lượng animation (0.5s)
    }

    // Hàm xử lý submenu
    function toggleSubmenu(e) {
        e.preventDefault();
        const menuItem = this.closest(".mobile-menu__item");

        // Đóng các submenu khác đang mở
        const siblings = menuItem.parentElement.children;
        Array.from(siblings).forEach((sibling) => {
            if (sibling !== menuItem && sibling.classList.contains("active")) {
                sibling.classList.remove("active");
            }
        });

        // Mở/đóng submenu hiện tại
        menuItem.classList.toggle("active");
    }

    // Sự kiện mở/đóng menu
    mobileMenuToggle.addEventListener("click", toggleMenu);
    mobileMenuClose.addEventListener("click", closeMenuWithAnimation);

    // Đóng menu khi nhấp vào overlay
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
            closeMenuWithAnimation();
        }
    });

    // Sự kiện mở/đóng submenu
    menuLinks.forEach((link) => {
        link.addEventListener("click", toggleSubmenu);
    });

    // Xử lý phần Scroll Top
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

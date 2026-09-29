document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamb-toggle");
    const menu = document.querySelector(".hamb");
    const homepageMenuToggle = document.querySelector(".homepage-menu-toggle");
    const homepageNavigation = document.querySelector("#homepage-navigation");
    const yearNode = document.querySelector("[data-current-year]");

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("show-hamb");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    if (homepageMenuToggle && homepageNavigation) {
        homepageMenuToggle.addEventListener("click", function () {
            const isOpen = homepageNavigation.classList.toggle("is-open");
            homepageMenuToggle.setAttribute("aria-expanded", String(isOpen));
            homepageMenuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });
    }
});
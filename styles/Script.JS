document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamb-toggle");
    const menu = document.querySelector(".hamb");
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
});
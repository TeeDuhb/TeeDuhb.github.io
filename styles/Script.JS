document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamb-toggle");
    const menu = document.querySelector(".hamb");
    const homepageMenuToggle = document.querySelector(".homepage-menu-toggle");
    const homepageNavigation = document.querySelector("#homepage-navigation");
    const homeMenuToggle = document.querySelector(".home-menu-toggle");
    const homeNavigation = document.querySelector("#home-navigation");
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

    if (homeMenuToggle && homeNavigation) {
        let revealTimer;
        let staticTimer;

        const closeHomeMenu = (restoreFocus = false) => {
            window.clearTimeout(revealTimer);
            window.clearTimeout(staticTimer);
            homeNavigation.classList.remove("is-content-visible", "is-opening");
            homeMenuToggle.classList.remove("is-static");
            homeMenuToggle.querySelector(".home-menu-toggle-glyph").textContent = "☰";
            homeMenuToggle.setAttribute("aria-expanded", "false");
            homeMenuToggle.setAttribute("aria-label", "Open navigation");
            homeNavigation.setAttribute("aria-hidden", "true");
            homeNavigation.inert = true;
            document.body.classList.remove("menu-open");

            if (restoreFocus) {
                homeMenuToggle.focus();
            }
        };

        homeMenuToggle.addEventListener("click", function () {
            const isOpen = homeMenuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeHomeMenu();
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            homeNavigation.setAttribute("aria-hidden", "false");
            homeNavigation.classList.add("is-opening");
            homeMenuToggle.classList.add("is-static");
            homeMenuToggle.setAttribute("aria-expanded", "true");
            homeMenuToggle.setAttribute("aria-label", "Close navigation");
            document.body.classList.add("menu-open");

            staticTimer = window.setTimeout(() => {
                homeMenuToggle.classList.remove("is-static");
                homeMenuToggle.querySelector(".home-menu-toggle-glyph").textContent = "×";
            }, reduceMotion ? 1 : 420);

            revealTimer = window.setTimeout(() => {
                homeNavigation.classList.add("is-content-visible");
                homeNavigation.inert = false;
                const firstLink = homeNavigation.querySelector(".home-menu-links a");
                if (firstLink) {
                    firstLink.focus();
                }
            }, reduceMotion ? 1 : 780);
        });

        homeNavigation.addEventListener("click", function (event) {
            if (event.target.closest(".home-menu-links a")) {
                closeHomeMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && homeMenuToggle.getAttribute("aria-expanded") === "true") {
                closeHomeMenu(true);
                return;
            }

            if (event.key === "Tab" && homeMenuToggle.getAttribute("aria-expanded") === "true") {
                if (!homeNavigation.classList.contains("is-content-visible")) {
                    event.preventDefault();
                    homeMenuToggle.focus();
                    return;
                }

                const focusableItems = [
                    homeMenuToggle,
                    ...homeNavigation.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
                ];
                const firstItem = focusableItems[0];
                const lastItem = focusableItems[focusableItems.length - 1];

                if (event.shiftKey && document.activeElement === firstItem) {
                    event.preventDefault();
                    lastItem.focus();
                } else if (!event.shiftKey && document.activeElement === lastItem) {
                    event.preventDefault();
                    firstItem.focus();
                }
            }
        });
    }
});
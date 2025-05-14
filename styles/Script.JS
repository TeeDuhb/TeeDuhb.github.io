/*document.querySelector(".hamb-toggle").addEventListener("click", function() {
    document.querySelector(".hamb").classList.toggle("show-hamb");
});*/

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamb-toggle");
    const menu = document.querySelector(".hamb");  // Ensure this matches your updated class name

    console.log("Script loaded and elements selected."); // This will help confirm execution

    if (menuToggle && menu) { // Prevent errors if elements aren't found
        menuToggle.addEventListener("click", function () {
            console.log("Toggle clicked!");  // Check if this appears when clicking the button
            menu.classList.toggle("show-hamb"); // Updated to match new class name
    });
    } else {
        console.error("Menu or toggle button not found!");
    }
});


//Legacy?
var total = "124.0" 
console.log(typeof total);
// Mobile Menu
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}


// Dark / Light Mode
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Page load झाल्यावर theme check
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");
    themeIcon.src = "../images/sun.png";

} else {

    themeIcon.src = "../images/moon.png";
}

// Theme Toggle
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");
        themeIcon.src = "../images/sun.png";

    } else {

        localStorage.setItem("theme", "light");
        themeIcon.src = "../images/moon.png";
    }

});
// header
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");

    console.log(document.querySelector(".nav-links").classList);
}

// image slider
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}
// Auto Slide
setInterval(nextSlide, 4000);

// shop new arrival button
function openProducts() {
    window.location.href = "products.html";
}

// category section
function openProducts() {
    window.location.href = "products.html";
}

// feature product 
function addToCart(productName) {
    alert(productName + " added to cart!");
}

// click on img
function openProductDetails() {
    window.location.href = "product-details.html";
}

// offer
function shopNow() {
    window.location.href = "products.html";
}
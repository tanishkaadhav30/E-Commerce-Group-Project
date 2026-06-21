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

 

// click on img
function openProductDetails() {
    window.location.href = "product-details.html";
}
// feature product
function addToCart(productName) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {};

    if (productName === "Laptop") {
        product = {
            id: 101,
            name: "Laptop",
            price: 59999,
            oldPrice: 65000,
            image: "../images/laptop1.jpg"
        };
    }

    else if (productName === "Wireless Headphones") {
        product = {
            id: 102,
            name: "Wireless Headphones",
            price: 2999,
            oldPrice: 3500,
            image: "../images/headphone.jpg"
        };
    }

    else if (productName === "Smart Watch") {
        product = {
            id: 103,
            name: "Smart Watch",
            price: 4999,
            oldPrice: 5500,
            image: "../images/watch.jpg"
        };
    }

    else if (productName === "Sports Shoes") {
        product = {
            id: 104,
            name: "Sports Shoes",
            price: 1999,
            oldPrice: 2500,
            image: "../images/shoes.jpg"
        };
    }

    const alreadyExists = cart.find(item => item.id === product.id);

    if (alreadyExists) {
        alert("Product Already In Cart");
        return;
    }

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added To Cart");
}

// offer
function shopNow() {
    window.location.href = "products.html";
}

// newsletter
// email validation
function subscribeNewsletter() {

    let email = document.getElementById("email").value;

    if(email === "") {
        alert("Please enter your email address!");
        return;
    }

    if(!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Thank you for subscribing!");

    document.getElementById("email").value = "";
}

// frequently asked questions
function toggleFaq(button){

    const answer = button.nextElementSibling;

    if(answer.style.maxHeight){
        answer.style.maxHeight = null;
    }
    else{
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

}

// dark light mode
// Dark Mode

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Page reload नंतर theme कायम ठेवण्यासाठी
if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    themeIcon.src = "./images/sun.png";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeIcon.src = "./images/sun.png";

    }else{

        localStorage.setItem("theme","light");

        themeIcon.src = "./images/moon.png";
    }
});
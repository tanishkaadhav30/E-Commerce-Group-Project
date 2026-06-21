const recommendedProducts = [

    {
        id: 1,
        name: "Gaming Headset",
        price: 1899,
        oldPrice: 2200,
        image: "../images/gaminghandset.webp"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2999,
        oldPrice: 3500,
        image: "../images/smartwatch.webp"
    },

    {
        id: 3,
        name: "Wireless Earbuds",
        price: 1499,
        oldPrice: 1900,
        image: "../images/wireless earbuds.webp"
    },

    {
        id: 4,
        name: "Denim Jacket",
        price: 2199,
        oldPrice: 2600,
        image: "../images/denim jacket.avif"
    },

    {
        id: 5,
        name: "Sports Shoes",
        price: 2499,
        oldPrice: 3000,
        image: "../images/shoessport.webp"
    },

    {
        id: 6,
        name: "Leather Bag",
        price: 1699,
        oldPrice: 2100,
        image: "../images/leather bag.jpg"
    },

    {
        id: 7,
        name: "Premium Shirt",
        price: 999,
        oldPrice: 1400,
        image: "../images/premiumshirt.jpg"
    },

    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 1999,
        oldPrice: 2500,
        image: "../images/bluetoothe speaker.webp"
    }

];

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

let discountAmount = 0;

function displayCart() {

    const cartContainer =
        document.getElementById("cart-container");

    cartContainer.innerHTML = "";

   
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart-box">
                <h2>🛒 Your Cart is Empty</h2>
                <p>Add products to continue shopping</p>

                <a href="../pages/product.html" class="continue-btn">
                    Continue Shopping
                </a>
            </div>
        `;

        updateSummary();
        return;
    }

    cart.forEach(item => {

        cartContainer.innerHTML +=

            `
<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="product-info">

<h3>${item.name}</h3>

<p>Premium Quality Product</p>

<div class="price-box">

<del>₹${item.oldPrice}</del>

<span>₹${item.price}</span>

</div>

</div>

<div class="cart-actions">

<button
class="buy-btn"
onclick="buyNow(${item.id})">

Buy Now

</button>

<button
class="remove-btn"
onclick="removeItem(${item.id})">

Remove

</button>

</div>

</div>
`;

    });

    updateSummary();

}

function removeItem(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}

const addButtons =
    document.querySelectorAll(".add-cart");

addButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const product =
            recommendedProducts[index];

        const alreadyExists =
            cart.find(
                item => item.id === product.id
            );

        if (alreadyExists) {

            alert("Product Already In Cart");
            return;

        }

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        displayCart();

        button.innerHTML = " Added";

        setTimeout(() => {

            button.innerHTML = `Add To Cart`;

        }, 1500);

    });

});

function updateSummary() {

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price;
    });

    let tax =
        Math.floor(subtotal * 0.05);

    let total =
        subtotal + tax - discountAmount;

    if (total < 0) {
        total = 0;
    }

    document.getElementById("subtotal")
        .innerText = `₹${subtotal}`;

    document.getElementById("discount")
        .innerText = `₹${discountAmount}`;

    document.getElementById("tax")
        .innerText = `₹${tax}`;

    document.getElementById("total")
        .innerText = `₹${total}`;
}

document
    .getElementById("applyCoupon")
    .addEventListener("click", () => {

        const code =
            document
                .getElementById("couponInput")
                .value
                .trim()
                .toUpperCase();

        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price;
        });

        if (code === "SAVE10") {

            discountAmount =
                Math.floor(subtotal * 0.10);

            alert("10% Discount Applied");

        }

        else if (code === "SAVE20") {

            discountAmount =
                Math.floor(subtotal * 0.20);

            alert("20% Discount Applied");

        }

        else {

            discountAmount = 0;

            alert("Invalid Coupon Code");
        }

        updateSummary();

    });

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Cart Is Empty");
            return;
        }

        alert("🎉 Order Placed Successfully");

        cart = [];

        localStorage.removeItem("cart");

        displayCart();

    });

displayCart();

// dark light mode
// Dark Mode

const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeIcon.src = "../images/sun.png";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
        themeIcon.src = "../images/sun.png";
    }
    else{
        localStorage.setItem("theme","light");
        themeIcon.src = "../images/moon.png";
    }
});
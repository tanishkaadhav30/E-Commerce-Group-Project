const container =
document.getElementById("productsContainer");

const search =
document.getElementById("search");


function displayProducts(data){

    container.innerHTML = "";

    data.forEach(product => {

        const discount = Math.round(
            ((product.originalPrice - product.price) /
            product.originalPrice) * 100
        );

        container.innerHTML += `
        
        <div class="card">

            <img src="${product.images[0]}">

            <h3>${product.name}</h3>

            <div class="price-box">
            
                <del>
                    ₹${product.originalPrice.toLocaleString()}
                </del>

                <span class="new-price">
                    ₹${product.price.toLocaleString()}
                </span>

                <span class="discount">
                    ${discount}% OFF
                </span>

            </div>

         <div class="btn-box">

                <button
                onclick="viewDetails(${product.id})">
                    View Details
                </button>

                <button
                onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

            </div>

        </div>

        `;
    });

}

  
/* Category Filter */

function showProducts(category){

    let filteredProducts =
    products.filter(product =>
    product.category === category
    );

    displayProducts(filteredProducts);

}

/* Search Filter */

search.addEventListener(
"keyup",
function(){

    let keyword =
    this.value.toLowerCase();

    let result =
    products.filter(product =>

    product.name
    .toLowerCase()
    .includes(keyword)

    );

    displayProducts(result);

});
function viewDetails(id){

    localStorage.setItem(
    "selectedProduct",
    id
    );

    window.location.href =
    "product-detail.html";

}
function addToCart(id){

    let currentUser =
    JSON.parse(
    localStorage.getItem("currentUser")
    );

    if(!currentUser){

        alert("Please Login First");

        window.location.href =
        "register.html";

        return;
    }

    let cartKey =
    "cart_" + currentUser.mobile;

    let cart =
    JSON.parse(
    localStorage.getItem(cartKey)
    ) || [];

    let product =
    products.find(
    p => p.id === id
    );

    cart.push(product);

    localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
    );

    alert(
    product.name +
    " Added To Cart"
    );

    window.location.href =
    "cart.html";

}


showProducts("electronics");
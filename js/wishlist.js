const WISHLIST_KEY = "wishlist";
const CART_KEY = "cart";
const wishlistGrid = document.getElementById("wishlistGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const totalItems = document.getElementById("totalItems");
const estimatedTotal = document.getElementById("estimatedTotal");
const totalSavings = document.getElementById("totalSavings");
const selectedItems = document.getElementById("selectedItems");
const toggleSelectBtn = document.getElementById("toggleSelectBtn");
const moveSelectedBtn = document.getElementById("moveSelectedBtn");
const removeSelectedBtn = document.getElementById("removeSelectedBtn");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const whatsappBtn = document.getElementById("whatsappBtn");
const productTemplate = document.getElementById("productTemplate");
let allSelected = false;

function getWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function saveWishlist(products) {
    localStorage.setItem( WISHLIST_KEY, JSON.stringify(products) );
}

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem( CART_KEY, JSON.stringify(cart) );
}

function showToast(message) {
    const container = document.getElementById("toastContainer");
    const toast =  document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
         toast.remove();
    }, 3000);
}

function updateSummary() {
    const wishlist = getWishlist();
    let total = 0;
    let savings = 0;
    wishlist.forEach(product => {
        total += (product.price || 0) * (product.quantity || 1);
        if(product.oldPrice){
            savings += (product.oldPrice - product.price) *  (product.quantity || 1);
        }
    });

    totalItems.textContent = wishlist.length;
    estimatedTotal.textContent ="₹" + total.toLocaleString();
    totalSavings.textContent = "₹" + savings.toLocaleString();
    selectedItems.textContent = document.querySelectorAll( ".product-checkbox:checked" ).length;
}

function removeProduct(id) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter( product => product.id !== id );
    saveWishlist(wishlist);
    renderWishlist();
    showToast("Item removed");
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id );
    if(existing){
        existing.quantity +=  product.quantity || 1;
    }
    else{
        cart.push({
            ...product
        });
    }
    saveCart(cart);
    showToast("Added to cart");
}

function getFilteredProducts() {
    let products =  [...getWishlist()];
    const search = searchInput.value
        .trim()
        .toLowerCase();
    if(search){
        products = products.filter(
            product =>  product.name  .toLowerCase()  .includes(search) );
    }

    switch(sortSelect.value){
        case "nameAsc":
            products.sort((a,b)=>   a.name.localeCompare(b.name));
            break;
        case "nameDesc":
            products.sort((a,b)=> b.name.localeCompare(a.name));
            break;
        case "priceLow":
            products.sort((a,b)=>  a.price - b.price);
            break;
        case "priceHigh": 
        products.sort((a,b)=> b.price - a.price); 
         break;
        case "oldest":  
        products.sort((a,b)=> a.addedAt - b.addedAt);
            break;
        default:  
        products.sort((a,b)=>   b.addedAt - a.addedAt);
    }
    return products;
}

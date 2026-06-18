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

function renderWishlist() {
    const products = getFilteredProducts();
    wishlistGrid.innerHTML = "";
    if(products.length === 0){
        wishlistGrid.style.display ="none";
        emptyState.style.display = "block";
        updateSummary();
        return;
    }

    wishlistGrid.style.display = "grid";
    emptyState.style.display ="none";
    products.forEach(product => {
        const clone = productTemplate.content .cloneNode(true);
        const image =clone.querySelector( ".product-image" );
        const name =clone.querySelector(".product-name" );
        const category = clone.querySelector( ".product-category");
        const price = clone.querySelector(".product-price" );
        const oldPrice = clone.querySelector(".old-price" );
        const qtyValue = clone.querySelector(".qty-value");
        image.src = product.image || "https://via.placeholder.com/300";
        name.textContent = product.name;
        category.textContent = product.category || "";
        price.textContent = "₹" + product.price;
        oldPrice.textContent = product.oldPrice ? "₹" + product.oldPrice : "";
        qtyValue.textContent = product.quantity || 1;
        clone.querySelector(".qty-minus").addEventListener( "click", () => {
                if( product.quantity > 1){
                    product.quantity--;
                    const wishlist = getWishlist();
                    const index = wishlist.findIndex( item => item.id === product.id );
                    wishlist[index] = product;
                    saveWishlist( wishlist );
                    renderWishlist();
                }
            } );

            clone.querySelector( ".qty-plus").addEventListener("click", () => {
                product.quantity =(product.quantity || 1) + 1;
                const wishlist = getWishlist();
                const index = wishlist.findIndex( item => item.id === product.id );
                wishlist[index] = product;
                saveWishlist( wishlist );
                renderWishlist();
            } );

        clone.querySelector( ".product-checkbox").dataset.id = product.id;
        clone.querySelector(".product-checkbox").addEventListener("change", updateSummary );
        clone.querySelector(".remove-btn" ).addEventListener(  "click", () => removeProduct( product.id ) );
        clone.querySelector(".add-cart-btn").addEventListener( "click", () => addToCart( product) );
        wishlistGrid.appendChild( clone );
    });
    updateSummary();
}
toggleSelectBtn.addEventListener( "click", () => {
        const checkboxes =
            document.querySelectorAll( ".product-checkbox" );
        allSelected = !allSelected;
        checkboxes.forEach( checkbox => {
                checkbox.checked = allSelected;
            } );
        toggleSelectBtn.textContent = allSelected  ? "Deselect All" : "Select All";
        updateSummary();
    } );

function getSelectedIds() {
    return [ ...document.querySelectorAll(".product-checkbox:checked")]
    .map( item => Number(item.dataset.id) );
}
removeSelectedBtn.addEventListener("click",() => {
        const selected = getSelectedIds();
        if(!selected.length){
            showToast("Select items first");
            return;
        }
        const wishlist = getWishlist().filter( product => !selected.includes( product.id ) );
        saveWishlist(wishlist);
        renderWishlist();
        showToast("Selected items removed" );
    } );

    moveSelectedBtn.addEventListener( "click",() => {
        const selected = getSelectedIds();
        if(!selected.length){
            showToast("Select items first");
            return;
        }
        const wishlist = getWishlist();
        selected.forEach(id => {
            const product = wishlist.find(item => item.id === id );
            if(product){
                addToCart(product);
            }
        });

        const remaining = wishlist.filter( product => !selected.includes(product.id ) );
        saveWishlist(remaining );
        renderWishlist();
        showToast("Moved to cart" );
    } );

searchInput.addEventListener("input", renderWishlist);
sortSelect.addEventListener("change", renderWishlist );
copyLinkBtn.addEventListener("click", async () => {
        try{
            await navigator.clipboard
            .writeText(window.location.href);
            showToast("Link copied" );
        }
        catch{ 
            showToast("Copy failed" );
        }
    } );

whatsappBtn.addEventListener( "click",() => {
        const text = encodeURIComponent( window.location.href );
        window.open( `https://wa.me/?text=${text}`, "_blank");
    } );
renderWishlist();

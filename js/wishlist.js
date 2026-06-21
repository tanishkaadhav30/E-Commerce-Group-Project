const wishlistGrid = document.getElementById("wishlistGrid");
const emptyState = document.getElementById("emptyState");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
function showToast(message){
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(()=>{ toast.classList.remove("show");
    },2500);
}

function saveWishlist(){
    localStorage.setItem( "wishlist", JSON.stringify(wishlist) );
}

function updateSummary(){
    document.getElementById("totalItems")
    .textContent = wishlist.length;
    const selected = wishlist.filter(item => item.selected);
    document.getElementById("selectedItems")
    .textContent = selected.length;
    const totalValue = wishlist.reduce( (sum,item)=>sum + Number(item.price || 0), 0 );
    document.getElementById("totalValue")
    .textContent = "₹" + totalValue;
}

function renderWishlist(products = wishlist){
    document.querySelector(".bulk-actions").style.display = wishlist.length === 0 ? "none" : "flex";
    wishlistGrid.innerHTML = "";
    updateSummary();
    if(wishlist.length === 0){
        wishlistGrid.style.display = "none";
        emptyState.style.display = "block";
        return;
    }
    wishlistGrid.style.display = "grid";
    emptyState.style.display = "none";
    products.forEach((item,index)=>{
        const actualIndex = wishlist.findIndex( p =>  p.name === item.name && p.price === item.price );
        const card =
        document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
        <div class="image-wrapper">
            <input type="checkbox"class="select-product"${item.selected ? "checked" : ""} onchange="toggleSelect(${actualIndex})">
            <button class="share-product" onclick="shareProduct(${actualIndex})" title="Share Product" > <i class="fa-solid fa-share-nodes"></i> </button>
            <img src="${item.image}" alt="${item.name}" class="product-image" >
        </div>

        <div class="card-content">
            <h3>${item.name}</h3>
            <div class="price">
                ₹${item.price} </div>
            <div class="card-actions">
                <buttonclass="cart-btn" onclick="moveToCart(${actualIndex})">  Add To Cart</button>
                <button class="delete-btn" onclick="deleteItem(${actualIndex})"> Delete
                </button>
            </div>
        </div>  `;

        wishlistGrid.appendChild(card);
    });
}

function toggleSelect(index){
    wishlist[index].selected = !wishlist[index].selected;
    saveWishlist();
    renderWishlist();
}

function deleteItem(index){
    wishlist.splice(index,1);
    saveWishlist();
    renderWishlist();
    showToast("Product Removed");
}

function moveToCart(index){
    let cart =JSON.parse(localStorage.getItem("cart"))
    || [];
    cart.push(wishlist[index]);
    localStorage.setItem( "cart", JSON.stringify(cart));
    wishlist.splice(index,1);
    saveWishlist();
    renderWishlist();
    showToast("Moved To Cart");
}

function shareProduct(index){
    const item = wishlist[index];
    const shareText =
    `${item.name} - ₹${item.price}`;
    if(navigator.share){
        navigator.share({
            title:item.name, text:shareText, url:window.location.href
        });
    }else{
        navigator.clipboard.writeText( shareText );
        showToast("Product Details Copied" );
    }
}

document
.getElementById("selectAllToggle")
.addEventListener("change",function(){
    wishlist.forEach(item=>{
        item.selected = this.checked;
    });
    saveWishlist();
    renderWishlist();
});

document
.getElementById("moveSelectedBtn")
.addEventListener("click",()=>{
    const selectedItems =wishlist.filter( item => item.selected );
    if(selectedItems.length === 0){
        showToast("Select Products First");
        return;
    }
    let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];
    cart.push(...selectedItems);
    localStorage.setItem( "cart", JSON.stringify(cart));
    wishlist = wishlist.filter( item => !item.selected);
    saveWishlist();
    renderWishlist();
    showToast("Selected Products Moved");
});

document
.getElementById("deleteSelectedBtn")
.addEventListener("click",()=>{
    const count = wishlist.filter(item => item.selected).length;
    if(count === 0){
        showToast("Select Products First" );
        return;
    }
    wishlist =  wishlist.filter( item => !item.selected);
    saveWishlist();
    renderWishlist();
    showToast("Selected Products Deleted" );

});

document
.getElementById("searchInput")
.addEventListener("input",function(){
    const value =
    this.value.toLowerCase();
    const filtered =  wishlist.filter(item =>  item.name
        .toLowerCase()
        .includes(value) );
    renderWishlist(filtered);
});

document
.getElementById("sortSelect")
.addEventListener("change",function(){
    const value = this.value;
    let sorted =
    [...wishlist];
    switch(value){
        case "name-asc":
            sorted.sort((a,b)=>  a.name.localeCompare(b.name) );
        break;
        case "name-desc":
            sorted.sort((a,b)=>  b.name.localeCompare(a.name) );
        break;
        case "price-low":
            sorted.sort((a,b)=> a.price - b.price);
        break;
        case "price-high":
            sorted.sort((a,b)=>  b.price - a.price );
        break;
    }
    renderWishlist(sorted);
});

document
.getElementById("shareWishlistBtn")
.addEventListener("click",()=>{
    if(navigator.share){
        navigator.share({
            title:"My Wishlist", text:"Check out my wishlist", url:window.location.href
        });
    }else{
        showToast("Sharing Not Supported" );
    }
});

document
.getElementById("copyLinkBtn")
.addEventListener("click",()=>{
    navigator.clipboard
    .writeText( window.location.href )
    .then(()=>{
        showToast("Link Copied" );
    });
});
renderWishlist();

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
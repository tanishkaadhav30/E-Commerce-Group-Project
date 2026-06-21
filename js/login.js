const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Hide register form initially
registerForm.style.display = "none";

// Show Register Form
function showRegister() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
}

// Show Login Form
function showLogin() {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
}

// Register
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("registerEmail").value;
    const mobile = document.getElementById("registerMobile").value;
    const password = document.getElementById("registerPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if mobile already exists
    let existingUser = users.find(
        user => user.mobile === mobile
    );

    if (existingUser) {
        alert("Mobile number already registered!");
        return;
    }

    const user = {
        name,
        email,
        mobile,
        password
    };

    users.push(user);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration Successful!");

    registerForm.reset();

    showLogin();
});

// Login
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const mobile = document.getElementById("loginMobile").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u =>
            u.mobile === mobile &&
            u.password === password
    );

    if (user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login Successful!");

        // Redirect to products page
        window.location.href = "./../pages/product.html";

    } else {

        alert("Invalid Mobile Number or Password");

    }
});
function toggleLoginPassword() {

    const password =
        document.getElementById("loginPassword");

    const eye =
        document.getElementById("loginEye");

    if (password.type === "password") {
        password.type = "text";
        eye.className = "fa-solid fa-eye-slash";
        eye.src = "./../images/view.png";
    }
    else {
        password.type = "password";
        eye.className = "fa-solid fa-eye";
        eye.src = "./../images/hide.png";
    }
}

function toggleRegisterPassword() {

    const password =
        document.getElementById("registerPassword");

    const eye =
        document.getElementById("registerEye");

    if (password.type === "password") {
        password.type = "text";
        eye.className = "fa-solid fa-eye-slash";
        eye.src = "./../images/view.png";
    }

    else {
        password.type = "password";
        eye.className = "fa-solid fa-eye";
        eye.src = "./../images/hide.png";
    }
}
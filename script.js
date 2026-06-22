// Product Container
const productContainer =
document.getElementById("productContainer");

// Cart Container
const cartItems =
document.getElementById("cartItems");

// Load Cart from Local Storage
let cart =
JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// Load Products
// =========================

async function loadProducts() {

    if (!productContainer) return;

    try {

        const response =
        await fetch(
        "https://fakestoreapi.com/products"
        );

        const products =
        await response.json();

        productContainer.innerHTML = "";

        products.forEach(product => {

            const card =
            document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `

            <img
            src="${product.image}"
            alt="${product.title}"
            >

            <h3>${product.title}</h3>

            <p>₹ ${Math.round(product.price * 85)}</p>

            <button onclick="addToCart(${product.id})">
            Add To Cart
            </button>

            `;

            productContainer.appendChild(card);

        });

    }

    catch(error) {

        productContainer.innerHTML =
        "<h2>Unable to load products.</h2>";

        console.error(error);

    }

}


// =========================
// Add To Cart
// =========================

async function addToCart(id) {

    try {

        const response =
        await fetch(
        `https://fakestoreapi.com/products/${id}`
        );

        const product =
        await response.json();

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product Added To Cart");

    }

    catch(error) {

        console.error(error);

    }

}


// =========================
// Display Cart
// =========================

function displayCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
        "<h2>Your Cart Is Empty</h2>";

        return;
    }

    cart.forEach((item,index) => {

        const li =
        document.createElement("li");

        li.innerHTML = `

        <strong>${item.title}</strong>

        <br>

        ₹ ${Math.round(item.price * 85)}

        <br><br>

        <button onclick="removeItem(${index})">
        Remove
        </button>

        `;

        cartItems.appendChild(li);

    });

}


// =========================
// Remove Item
// =========================

function removeItem(index) {

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// =========================
// Total Amount
// =========================

function calculateTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * 85;

    });

    return total.toFixed(2);

}


// =========================
// Show Total
// =========================

function showTotal() {

    const totalBox =
    document.getElementById("total");

    if(totalBox){

        totalBox.innerHTML =

        `Total Amount :
        ₹ ${calculateTotal()}`;

    }

}


// =========================
// Run Functions
// =========================

loadProducts();

displayCart();

showTotal();
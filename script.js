const products = [
    { id: 1, name: "Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1200 },
    { id: 3, name: "Watch", price: 2000 }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");

// Display Products
function displayProducts() {
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

// Add to Cart
function addToCart(id) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update Cart UI
function updateCart() {
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.innerHTML = `
            ${item.name} - ₹${item.price} x ${item.quantity}
            <button onclick="increaseQty(${item.id})">+</button>
            <button onclick="decreaseQty(${item.id})">-</button>
        `;
        cartDiv.appendChild(div);
    });

    totalSpan.textContent = total;
}

// Increase Quantity
function increaseQty(id) {
    const item = cart.find(p => p.id === id);
    item.quantity++;
    updateCart();
}

// Decrease Quantity
function decreaseQty(id) {
    const item = cart.find(p => p.id === id);
    item.quantity--;

    if (item.quantity === 0) {
        cart = cart.filter(p => p.id !== id);
    }

    updateCart();
}

displayProducts();

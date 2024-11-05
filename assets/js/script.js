let cart = [];

document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});

document.getElementById('close').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('show');
});

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    alert(`${productName} added to cart!`);
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        let cartItems = "Your Cart:\n";
        cart.forEach(item => {
            cartItems += `${item.name}: R${item.price}\n`;
        });
        alert(cartItems);
    }
}

// Initialize or retrieve the cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product is new, add it to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${productName} has been added to your cart.`);
}

// View cart function
function viewCart() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    let cartContent = 'Your Cart:\n';
    cart.forEach(item => {
        cartContent += `${item.name} - R ${item.price} x ${item.quantity}\n`;
    });
    alert(cartContent);
}

// Initialize or retrieve the cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product is new, add it to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${productName} has been added to your cart.`);
    viewCart(); // Refresh the cart view
}

// View cart function
function viewCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = 'Your cart is empty.';
        cartTotalContainer.innerHTML = 'Total: R 0.00';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                ${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
				<button onclick="changeQuantity('${item.name}', 1)">+</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
        cartTotalContainer.innerHTML = `Total: R ${total.toFixed(2)}`;
    }

    document.getElementById('cartModal').style.display = 'block';
}

// Change quantity of cart items
function changeQuantity(productName, change) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove item if quantity is 0
        }
    }

    saveCart(cart);
    viewCart(); // Refresh cart view
}

// Clear cart function
function clearCart() {
    localStorage.removeItem('cart');
    viewCart(); // Refresh cart view
}

// Checkout function (placeholder)
function checkout() {
    alert('Checkout feature is not implemented yet.');
    // You can redirect to a checkout page or implement further logic here
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

//WHATSAPP DETAILS IN//

// Function to checkout via WhatsApp
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    let message = "Hello! I would like to place an order for the following items:\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}\n`;
    });

    message += `\nTotal: R ${total.toFixed(2)}\n`;
    message += "Please confirm my order.";

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/27726962588?text=${encodedMessage}`;

    // Open WhatsApp link in a new tab
    window.open(whatsappLink, '_blank');
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const address = document.getElementById('address').value;

    const message = `Name: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nAddress: ${address}`;
    const whatsappNumber = '27726962588'; // Replace with your WhatsApp number
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
});

//WHATSAPP DETAILS OUT//



function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        const productCategory = product.getAttribute('data-category');

        const matchesSearch = productName.includes(searchInput);
        const matchesCategory = categoryFilter === "" || productCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
            product.style.display = ''; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}

function changeImage(newImage) {
    const productImage = event.target.closest('.product').querySelector('.product-image');
    productImage.src = newImage; // Change the image source
}

// EXTERNAL PAGE PRODUCT SEARCH // 
let products = [];

async function fetchProducts() {
    const liquorResponse = await fetch('liquor.html');
    const liquorText = await liquorResponse.text();
    const groceryResponse = await fetch('grocery.html');
    const groceryText = await groceryResponse.text();

    const liquorDOM = new DOMParser().parseFromString(liquorText, 'text/html');
    const groceryDOM = new DOMParser().parseFromString(groceryText, 'text/html');

    liquorDOM.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('strong').textContent.replace('R ', ''));
        const imageUrl = product.querySelector('img').src;
        products.push({ name, price, imageUrl, category: product.dataset.category });
    });

    groceryDOM.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('strong').textContent.replace('R ', ''));
        const imageUrl = product.querySelector('img').src;
        products.push({ name, price, imageUrl, category: product.dataset.category });
    });
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = products.filter(product => product.name.toLowerCase().includes(query));
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    const clearButton = document.getElementById('clear-button');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No products found.</p>';
        clearButton.style.display = 'none'; // Hide clear button if no results
        return;
    }

    results.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p><strong>R ${product.price.toFixed(2)}</strong></p>
                <button onclick="addToCart('${product.name}', ${product.price})" class="add-to-cart-button">Add to Cart</button>
            </div>
        `;
        resultsContainer.appendChild(div);
    });

    clearButton.style.display = 'inline'; // Show clear button when results are present
}

function clearResults() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('clear-button').style.display = 'none'; // Hide clear button
}

// Initialize products on window load
window.onload = fetchProducts;

// Attach the search function to the button click event
document.getElementById('search-button').addEventListener('click', searchProducts);


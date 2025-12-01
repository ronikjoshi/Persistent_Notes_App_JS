const wishlistContainer = document.querySelector("#wishlistContainer");
let products = JSON.parse(localStorage.getItem("products")) || [];

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="info">
      <p><strong>${product.name}</strong></p>
      <p>Price: $${product.price}</p>
    </div>
    <button class="delete-btn">Delete</button>
  `;

  wishlistContainer.appendChild(card);
});

const productForm = document.querySelector("#productForm");
const nameInput = document.querySelector("#nameInput");
const priceInput = document.querySelector("#priceInput");
const imageInput = document.querySelector("#imageInput");

productForm.addEventListener("submit", (event) => {
  
  event.preventDefault(); 

  const newProduct = {
    name: nameInput.value,
    price: priceInput.value,
    image: imageInput.value
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${newProduct.image}" alt="${newProduct.name}">
    <div class="info">
      <p><strong>${newProduct.name}</strong></p>
      <p>Price: $${newProduct.price}</p>
    </div>
    <button class="delete-btn">Delete</button>
  `;

  wishlistContainer.appendChild(card);

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
});

// Delete products using event delegation
wishlistContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.parentElement;

    // Find product index in array
    const productName = card.querySelector(".info p strong").textContent;
    const index = products.findIndex(p => p.name === productName);

    if (index > -1) {
      products.splice(index, 1); // Remove from array
      localStorage.setItem("products", JSON.stringify(products)); // Update localStorage
    }

    // Remove card from DOM
    card.remove();
  }
});
const products = [
  { id: 1, title: "Notebook", price: 1000 },
  { id: 2, title: "Mouse", price: 100 },
  { id: 3, title: "Keyboard", price: 250 },
  { id: 4, title: "Gamepad", price: 150 },
];

const renderProduct = (title = "Unknown", price = 0) => {
  return `
    <div class="product-item">
        <h3>${title}</h3>
        <p>$${price}</p>
        <button class="buy-btn">Добавить</button>
    </div>
    `;
};

const renderProducts = (products) => {
  document.querySelector(".products").innerHTML = products
    .map((product) => {
      return renderProduct(product.title, product.price);
    })
    .join("");
};

renderProducts(products);

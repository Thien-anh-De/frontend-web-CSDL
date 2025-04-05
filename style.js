const products = [
  {
    id: 1,
    name: "Áo hoodie nam",
    price: 200000,
    image: "https://images.unsplash.com/photo-1602810318442-91c9e4d4400b?auto=format&fit=crop&w=300&q=80",
    category: "Thời trang"
  },
  {
    id: 2,
    name: "Tai nghe Bluetooth",
    price: 350000,
    image: "https://images.unsplash.com/photo-1580894894513-f73c91c0e4e1?auto=format&fit=crop&w=300&q=80",
    category: "Điện tử"
  },
  {
    id: 3,
    name: "Giày sneaker nữ",
    price: 450000,
    image: "https://images.unsplash.com/photo-1600185365483-26b3d8582854?auto=format&fit=crop&w=300&q=80",
    category: "Thời trang"
  },
  {
    id: 4,
    name: "Ốp lưng iPhone",
    price: 100000,
    image: "https://images.unsplash.com/photo-1618426362764-d82c176ec9b4?auto=format&fit=crop&w=300&q=80",
    category: "Phụ kiện"
  }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

function renderProducts(data) {
  productList.innerHTML = "";
  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()}đ</p>
    `;
    productList.appendChild(card);
  });
}

function filterCategory(cat) {
  if (cat === "Tất cả") {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
  }
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

renderProducts(products);

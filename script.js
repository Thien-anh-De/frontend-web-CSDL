let allProducts = [];

// Tải dữ liệu sản phẩm từ file JSON
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  })
  .catch(err => {
    console.error("Lỗi khi tải JSON:", err);
  });

// Hàm hiển thị danh sách sản phẩm
function renderProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>Giá: ${product.price.toLocaleString()} VNĐ</p>
      <p>Còn lại: ${product.stock}</p>
      <button onclick="addToCart('${product.product_id}')">🛒 Thêm vào giỏ</button>
    `;

    productList.appendChild(productCard);
  });
}

// Hàm lọc sản phẩm theo danh mục
function filterCategory(category) {
  if (category === 'Tất cả') {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Hàm xử lý tìm kiếm sản phẩm theo tên
document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  const product = allProducts.find(p => p.product_id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.product_id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
}

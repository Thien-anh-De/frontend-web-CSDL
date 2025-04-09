let allProducts = [];

function fetchProducts(category = '', search = '') {
  let url = '/api/products';
  const params = new URLSearchParams();

  if (category && category !== 'Tất cả') params.append('category', category);
  if (search) params.append('search', search);

  if (params.toString()) {
    url += '?' + params.toString();
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(data);
    })
    .catch(err => console.error("Lỗi khi tải dữ liệu:", err));
}

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

function filterCategory(category) {
  fetchProducts(category);
}

document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value;
  fetchProducts('', keyword);
});

function addToCart(productId) {
  const product = allProducts.find(p => p.product_id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.product_id === productId);

  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`✅ Đã thêm \"${product.name}\" vào giỏ hàng!`);
}

// Tải sản phẩm khi khởi động
fetchProducts();

from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

# Load dữ liệu từ file JSON
with open('products.json', 'r', encoding='utf-8') as f:
    all_products = json.load(f)

# Route để trả về giao diện trang chủ
@app.route('/')
def index():
    return render_template("index.html")  # hoặc "trang_chủ.html" nếu bạn đổi tên
# Route cho trang login
@app.route('/login')
def login():
    return render_template("login.html")

# Route cho trang register
@app.route('/register')
def register():
    return render_template("register.html")

# Route cho giỏ hàng
@app.route('/cart')
def cart():
    return render_template("cart.html")

# API trả về sản phẩm
@app.route('/api/products')
def get_products():
    category = request.args.get('category')
    search = request.args.get('search', '').lower()

    filtered = all_products

    if category and category != 'Tất cả':
        filtered = [p for p in filtered if p['category'] == category]

    if search:
        filtered = [p for p in filtered if search in p['name'].lower()]

    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True)

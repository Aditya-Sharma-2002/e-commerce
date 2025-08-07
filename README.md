# 🛍️ E-commerce Website

![GitHub Repo stars](https://img.shields.io/github/stars/Aditya-Sharma-2002/ecommerce?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Aditya-Sharma-2002/ecommerce?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Aditya-Sharma-2002/ecommerce?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Aditya-Sharma-2002/ecommerce?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/Aditya-Sharma-2002/ecommerce?style=for-the-badge)
![License](https://img.shields.io/github/license/Aditya-Sharma-2002/ecommerce?style=for-the-badge)

---

## 📌 Introduction  
The **E-commerce Website** is a full-stack **MERN-based platform** designed to revolutionize traditional retail businesses.  
It enables customers to easily browse, filter, and purchase products while helping admins manage inventory, suppliers, and orders seamlessly.  

---

## 🎯 Objectives
- Provide a smooth online shopping experience for customers.  
- Automate admin tasks like product management, order tracking, and supplier management.  
- Ensure a responsive, user-friendly, and secure platform.  
- Grow sales by showcasing premium products in one place.  

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **MongoDB** | NoSQL database for flexible data storage |
| **Express.js** | Backend framework for routing & APIs |
| **React.js** | Frontend library for dynamic user interface |
| **Node.js** | Server environment for scalable backend |

---

## 🔑 Features

✅ **User Panel**  
- Sign Up / Sign In (JWT Authentication)  
- Profile Update  
- View & Manage Cart  
- Product Filters (color, size, fabric, etc.)  
- Payment Gateway Integration  

✅ **Admin Panel**  
- Dashboard for Analytics  
- Add / Update / Delete Products  
- Manage Suppliers  
- View and Manage Orders  
- Create Categories  

---

## ⚙️ Environment Variables  

### 🔙 Backend `.env`
```env
DATABASE=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
USER=your_email_service_username
PASS=your_email_service_password
```

### 🎨 Frontend `.env`
```env
VITE_APP_API_URL=http://localhost:5000/api
```

> ⚡ Make sure to create `.env` files in both the **backend** and **frontend** directories.  

---

## 🚀 Getting Started

### 📥 Clone the Repository
```bash
git clone https://github.com/Aditya-Sharma-2002/ecommerce.git
cd ecommerce
```

### ⚙️ Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 🎨 Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

The app will be running at:  
- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:5000  

---

## 📸 Screenshots

| Home Page | Shop Page | Cart | Admin Dashboard |
|-----------|-----------|------|----------------|
| ![Home](screenshots/home.png) | ![Shop](screenshots/shop.png) | ![Cart](screenshots/cart.png) | ![Admin](screenshots/admin.png) |

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).  

---
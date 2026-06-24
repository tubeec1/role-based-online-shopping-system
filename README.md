# 🛒 Role-Based Online Shopping System for MIRO Market

## 📖 Project Overview

The Role-Based Online Shopping System for MIRO Market is a full-stack e-commerce platform designed to modernize product management, customer shopping experiences, and order processing. The system implements Role-Based Access Control (RBAC) to provide different functionalities for Administrators, Staff Members, and Customers.

The project was developed as a Final Year Project and aims to improve business operations through digital transformation by providing a secure, scalable, and user-friendly online shopping environment.

---

# 🎯 Project Objectives

The system was developed to:

* Automate product and category management.
* Enable customers to browse and purchase products online.
* Manage customer orders efficiently.
* Implement role-based access control.
* Generate business reports and sales statistics.
* Improve customer experience and business efficiency.

---

# 🛠 Technology Stack

## Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast
* React Icons
* Recharts

## Backend

* PHP (MVC Architecture)
* RESTful API
* JSON Responses

## Database

* MySQL

## Development Tools

* Visual Studio Code
* XAMPP
* Git & GitHub

---

# 👥 User Roles

## 1. Administrator (Role ID: 1)

The administrator has full system access.

### Permissions

* Manage Users
* Manage Categories
* Manage Products
* Manage Orders
* Update Order Status
* View Reports
* Manage Staff Accounts
* Manage Customer Accounts

---

## 2. Staff (Role ID: 2)

Staff members assist with daily operations.

### Permissions

* Manage Categories
* Manage Products
* Manage Orders
* Update Order Status

### Restrictions

* Cannot Access Reports
* Cannot Manage Users

---

## 3. Customer (Role ID: 3)

Customers can use the shopping platform.

### Permissions

* Register Account
* Login
* Update Profile
* Browse Products
* Search Products
* Add Products to Cart
* Place Orders
* View Order History

---

# ✨ Core Features

## Authentication Module

* User Registration
* User Login
* Secure Authentication
* Role-Based Authorization
* Profile Management

---

## Category Management

* Create Categories
* Update Categories
* Delete Categories
* View Categories

---

## Product Management

* Add Products
* Edit Products
* Delete Products
* Upload Product Images
* Product Stock Management

---

## Shopping Cart

* Add To Cart
* Update Cart Quantity
* Remove Cart Items
* View Cart Summary

---

## Order Management

* Place Orders
* View Orders
* Update Order Status

### Order Status Options

```text
Pending
Paid
Processing
Shipped
Delivered
Cancelled
```

---

## Manual Payment Verification

The system currently supports manual payment verification.

### Process

1. Customer places order.
2. Customer sends payment manually.
3. Administrator verifies payment.
4. Order status is updated accordingly.

---

## Dashboard System

### Admin Dashboard

* Revenue Statistics
* Sales Reports
* Order Reports
* Product Reports
* User Statistics

### Staff Dashboard

* Product Statistics
* Category Statistics
* Order Statistics

---

## Reports Module

The reporting module provides:

* Total Revenue
* Total Orders
* Total Products
* Total Categories
* Order Status Analysis
* Sales Overview
* Product Performance Reports

---

# 🗄 Database Design

Main Tables:

* users
* roles
* categories
* products
* cart_items
* orders
* order_items
* payments

The database follows relational database principles and supports role-based access control and order processing workflows.

---

# 🏗 System Architecture

```text
Customer / Admin / Staff
          │
          ▼
React Frontend (Redux + Tailwind)
          │
          ▼
PHP REST API (MVC Architecture)
          │
          ▼
MySQL Database
```

---

# 🚀 Installation Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/your-username/online-shopping-system.git
```

---

## Step 2: Move Project

Place project inside:

```text
C:\xampp\htdocs\online-shopping-system
```

---

## Step 3: Start XAMPP

Enable:

* Apache
* MySQL

---

## Step 4: Create Database

Create:

```sql
oss
```

Import:

```text
database.sql
```

---

## Step 5: Configure Database Connection

Update:

```text
backend/config/database.php
```

---

## Step 6: Install Frontend Packages

Navigate to frontend folder:

```bash
cd frontend
npm install
```

---

## Step 7: Run Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 📸 System Screenshots

The following screenshots should be included in the project report and GitHub repository:

### Home Page

* Product Listings
* Category Navigation

### Customer Dashboard

* Shopping Cart
* Order History

### Login Page

* Authentication Form

### Registration Page

* Customer Signup

### Admin Dashboard

* Statistics Cards
* Reports Charts

### Category Management

* Create / Update / Delete Categories

### Product Management

* Product Listing
* Product Creation Form

### Orders Management

* Order List
* Status Update Modal

### Reports Dashboard

* Revenue Chart
* Order Statistics
* Sales Analytics

### User Management

* Staff Accounts
* Customer Accounts

---

# 📚 Academic Information

### Project Title

**Design and Implementation of a Role-Based Online Shopping System for MIRO Market**

### Institution

Bachelor Degree Final Year Project

### Location

Mogadishu, Somalia

### Academic Year

2025–2026

---

# 👨‍💻 Author

**Mohamed Suleyman Ibrahim**

Full Stack Developer

* HTML
* CSS
* JavaScript
* React.js
* Node.js
* Express.js
* PHP
* MySQL

---

# 📄 License

This project was developed for academic and educational purposes. Commercial use requires permission from the author.

---

# ⭐ Future Enhancements

* EVC Plus Integration
* Sahal Payment Integration
* SMS Notifications
* Email Notifications
* Mobile Application (Android & iOS)
* Product Recommendation System
* AI-Based Sales Analytics
* Inventory Forecasting
* Customer Reviews and Ratings

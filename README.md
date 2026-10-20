# 📦 Product Inventory & Analytics Dashboard

An interactive web-based dashboard for managing products, monitoring stock levels, and analyzing inventory data. Built with **Node.js, Express.js, HTML, CSS, and JavaScript**, this project provides an easy way to manage product records and visualize inventory insights.

## 🚀 Features

- **Product Management (CRUD):** Add, view, edit, and delete product records.
- **Dashboard Analytics:** View total products, stock units, inventory value, and low/out-of-stock counts.
- **Search Products:** Quickly find products by search criteria.
- **Category Filtering:** Filter products by category.
- **Sorting:** Sort products by name, price, and quantity.
- **Stock Status:** Identify in-stock, low-stock, and out-of-stock products.
- **Stock Alerts:** Highlight products that need restocking.
- **Category-wise Visualization:** View stock distribution using a chart.
- **CSV Export:** Export inventory information for reporting and analysis.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Dashboard structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend functionality and interactions |
| Node.js | JavaScript runtime |
| Express.js | Backend server and API |
| JSON | File-based product data storage |
| Git & GitHub | Version control and project hosting |




## 📸 Application Screenshots

### Product Inventory Dashboard

The dashboard provides an overview of inventory performance, including total products, stock units, inventory value, stock alerts, and product management tools.
![Product Inventory Dashboard](screenshotsdashboard.png)

**Dashboard features shown:**
- Inventory summary cards
- Add New Product form
- Product list with price, quantity, and stock status
- Search, category filter, and sorting
- Edit and Delete actions
- CSV export functionality
## ⚙️ Installation and Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- A code editor such as Visual Studio Code

### 1. Clone the repository

```bash
git clone https://github.com/prathmeshp290605-png/Product-Inventory-Dashboard.git
```

### 2. Navigate to the project directory

```bash
cd Product-Inventory-Dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
node server.js
```

### 5. Open the dashboard

Open your browser and visit:

```text
http://localhost:3000
```

**Note:** If your server uses a different port, use the port configured in `server.js`. Keep the terminal running while using the application.

## 💻 Usage

1. Start the Node.js server.
2. Open the dashboard in your browser.
3. Add products with their details.
4. Search, filter, and sort products as needed.
5. Monitor inventory analytics and stock alerts.
6. Update or delete product records when required.
7. Export inventory data to CSV for reporting.

## 📁 Project Structure

```text
Product-Inventory-Dashboard/
├── public/
│   └── index.html
├── app.js
├── server.js
├── products.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 📊 Stock Status Rules

| Quantity | Status |
|---|---|
| 0 | Out of Stock |
| 1–5 | Low Stock |
| More than 5 | In Stock |

## 🔮 Future Improvements

- Integrate a database such as MongoDB or PostgreSQL.
- Add user authentication and role-based access.
- Implement persistent cloud storage for inventory records.
- Add advanced reports and date-based analytics.
- Deploy the application to a cloud hosting platform.

## 🎯 Project Objective

The goal of this project is to simplify inventory management by combining product operations, stock monitoring, and analytics in a single dashboard.


---

⭐ If you find this project useful, consider giving the repository a star.

*Built as a hands-on project to practice backend development, frontend integration, and inventory analytics.*

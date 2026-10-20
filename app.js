
const readline = require("readline/promises");
const fs = require("fs/promises");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA_FILE = path.join(__dirname, "products.json");

let products = [];

// Load products from JSON file
async function loadProducts() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
      throw new Error("JSON data must be an array.");
    }

    products = parsedData;
    console.log("Products loaded successfully!");
  } catch (error) {
    if (error.code === "ENOENT") {
      products = [];
      await saveProducts();
      console.log("New inventory file created.");
    } else {
      throw error;
    }
  }
}

// Save products to JSON file
async function saveProducts() {
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(products, null, 2),
    "utf8"
  );
}

// 1. View products
function displayProducts() {
  if (products.length === 0) {
    console.log("No products available.");
    return;
  }

  console.table(products);
}

// 2. Add product
async function addProduct() {
  const name = (await rl.question("Product name: ")).trim();
  const category = (await rl.question("Category: ")).trim();
  const priceInput = (await rl.question("Price: ")).trim();
  const quantityInput = (await rl.question("Quantity: ")).trim();

  const price = Number(priceInput);
  const quantity = Number(quantityInput);

  if (
    !name ||
    !category ||
    priceInput === "" ||
    quantityInput === "" ||
    !Number.isFinite(price) ||
    !Number.isInteger(quantity) ||
    price <= 0 ||
    quantity < 0
  ) {
    console.log("Invalid input. Please enter valid details.");
    return;
  }

  const id = products.length
    ? Math.max(...products.map(p => p.id)) + 1
    : 1;

  products.push({ id, name, category, price, quantity });

  try {
    await saveProducts();
    console.log("Product added and saved successfully!");
  } catch (error) {
    products.pop();
    console.log("Could not save product:", error.message);
  }
}

// 3. Search product
async function searchProduct() {
  const keyword = (
    await rl.question("Enter product name: ")
  ).trim().toLowerCase();

  if (!keyword) {
    console.log("Search name cannot be empty.");
    return;
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  if (results.length === 0) {
    console.log("No products found.");
  } else {
    console.table(results);
  }
}

// 4. Delete product
async function deleteProduct() {
  const inputId = (await rl.question("Product ID to delete: ")).trim();
  const id = Number(inputId);

  if (!inputId || !Number.isInteger(id) || id <= 0) {
    console.log("Invalid product ID.");
    return;
  }

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    console.log("Product not found.");
    return;
  }

  const removed = products.splice(index, 1)[0];

  try {
    await saveProducts();
    console.log(`${removed.name} deleted and changes saved.`);
  } catch (error) {
    products.splice(index, 0, removed);
    console.log("Could not save deletion:", error.message);
  }
}

// 5. Update product
async function updateProduct() {
  const inputId = (await rl.question("Product ID to update: ")).trim();
  const id = Number(inputId);

  if (!inputId || !Number.isInteger(id) || id <= 0) {
    console.log("Invalid product ID.");
    return;
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    console.log("Product not found.");
    return;
  }

  console.table([product]);

  const priceInput = (await rl.question("New price: ")).trim();
  const quantityInput = (await rl.question("New quantity: ")).trim();

  const price = Number(priceInput);
  const quantity = Number(quantityInput);

  if (
    priceInput === "" ||
    quantityInput === "" ||
    !Number.isFinite(price) ||
    !Number.isInteger(quantity) ||
    price <= 0 ||
    quantity < 0
  ) {
    console.log("Invalid price or quantity.");
    return;
  }

  const oldPrice = product.price;
  const oldQuantity = product.quantity;

  product.price = price;
  product.quantity = quantity;

  try {
    await saveProducts();
    console.log("Product updated and saved successfully!");
  } catch (error) {
    product.price = oldPrice;
    product.quantity = oldQuantity;
    console.log("Could not save update:", error.message);
  }
}

// 6. Sort products
async function sortProducts() {
  console.log("1. Price: Low to High");
  console.log("2. Price: High to Low");
  console.log("3. Quantity: Low to High");
  console.log("4. Quantity: High to Low");

  const choice = (await rl.question("Sorting option: ")).trim();

  let sorted;

  switch (choice) {
    case "1":
      sorted = [...products].sort((a, b) => a.price - b.price);
      break;
    case "2":
      sorted = [...products].sort((a, b) => b.price - a.price);
      break;
    case "3":
      sorted = [...products].sort((a, b) => a.quantity - b.quantity);
      break;
    case "4":
      sorted = [...products].sort((a, b) => b.quantity - a.quantity);
      break;
    default:
      console.log("Invalid sorting option.");
      return;
  }

  console.table(sorted);
}

// 7. Filter by category
async function filterByCategory() {
  const category = (
    await rl.question("Enter category: ")
  ).trim().toLowerCase();

  if (!category) {
    console.log("Category cannot be empty.");
    return;
  }

  const filtered = products.filter(
    p => p.category.toLowerCase() === category
  );

  if (filtered.length === 0) {
    console.log("No products found in this category.");
  } else {
    console.table(filtered);
  }
}

// 8. Analytics
function showAnalytics() {
  const totalStock = products.reduce(
    (sum, p) => sum + p.quantity, 0
  );

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity, 0
  );

  const lowStock = products.filter(
    p => p.quantity > 0 && p.quantity <= 5
  ).length;

  const outOfStock = products.filter(
    p => p.quantity === 0
  ).length;

  const averagePrice = products.length
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length
    : 0;

  console.log("\n===== INVENTORY ANALYTICS =====");
  console.log("Total Products:", products.length);
  console.log("Total Stock Units:", totalStock);
  console.log("Inventory Value: ₹" + inventoryValue.toLocaleString("en-IN"));
  console.log("Low-Stock Products:", lowStock);
  console.log("Out-of-Stock Products:", outOfStock);
  console.log("Average Product Price: ₹" + averagePrice.toLocaleString("en-IN"));
}

// Main menu
async function main() {
  try {
    await loadProducts();

    let choice;

    do {
      console.log("\n===== PRODUCT INVENTORY DASHBOARD =====");
      console.log("1. View All Products");
      console.log("2. Add Product");
      console.log("3. Search Product");
      console.log("4. Delete Product");
      console.log("5. View Analytics");
      console.log("6. Update Product");
      console.log("7. Sort Products");
      console.log("8. Filter by Category");
      console.log("9. Exit");

      choice = (await rl.question("Enter your choice (1-9): ")).trim();

      try {
        switch (choice) {
          case "1":
            displayProducts();
            break;
          case "2":
            await addProduct();
            break;
          case "3":
            await searchProduct();
            break;
          case "4":
            await deleteProduct();
            break;
          case "5":
            showAnalytics();
            break;
          case "6":
            await updateProduct();
            break;
          case "7":
            await sortProducts();
            break;
          case "8":
            await filterByCategory();
            break;
          case "9":
            console.log("Thank you for using Product Inventory Dashboard!");
            break;
          default:
            console.log("Invalid choice. Enter 1 to 9.");
        }
      } catch (error) {
        console.log("Operation failed:", error.message);
      }
    } while (choice !== "9");
  } catch (error) {
    console.error("Could not load inventory:", error.message);
  } finally {
    rl.close();
  }
}

main();


const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "products.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function readProducts() {
  const data = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(data);
}

async function saveProducts(products) {
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(products, null, 2),
    "utf8"
  );
}

function validProduct(body) {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.category === "string" &&
    body.category.trim().length > 0 &&
    typeof body.price === "number" &&
    Number.isFinite(body.price) &&
    body.price > 0 &&
    typeof body.quantity === "number" &&
    Number.isInteger(body.quantity) &&
    body.quantity >= 0
  );
}

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    res.json(await readProducts());
  } catch (error) {
    res.status(500).json({ message: "Could not read products." });
  }
});

// Add product
app.post("/api/products", async (req, res) => {
  try {
    if (!validProduct(req.body)) {
      return res.status(400).json({
        message: "Enter a valid name, category, price and quantity."
      });
    }

    const products = await readProducts();
    const id = products.length
      ? Math.max(...products.map(p => p.id)) + 1
      : 1;

    const product = {
      id,
      name: req.body.name.trim(),
      category: req.body.category.trim(),
      price: req.body.price,
      quantity: req.body.quantity
    };

    products.push(product);
    await saveProducts(products);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Could not save product." });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0 || !validProduct(req.body)) {
      return res.status(400).json({ message: "Invalid product details." });
    }

    const products = await readProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Product not found." });
    }

    products[index] = {
      id,
      name: req.body.name.trim(),
      category: req.body.category.trim(),
      price: req.body.price,
      quantity: req.body.quantity
    };

    await saveProducts(products);
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ message: "Could not update product." });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const products = await readProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Product not found." });
    }

    products.splice(index, 1);
    await saveProducts(products);

    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete product." });
  }
});

app.listen(PORT, () => {
  console.log(`Inventory Dashboard running at http://localhost:${PORT}`);
});


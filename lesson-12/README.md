# Lesson 12: Cart Completion

## Before You Start: Sync Your Fork

Because you are working from a fork, make sure your fork (and your Codespace) are up to date.

1. In the GitHub website, open **your fork** of this repo.
2. Click **Sync fork** (or **Fetch upstream**) and complete the prompts.
3. In your Codespace terminal (inside VS Code), pull the latest changes:

```bash
git pull
```

---

## Kill Any Processes on Ports 3000 or 3001

Before starting, make sure nothing is running on ports 3000 or 3001:

```bash
fuser -k 3000/tcp || true
fuser -k 3001/tcp || true
```

---

## Setup (2 Terminals)

1. Open **two terminals** in VS Code.

2. In **Terminal 1 (Client)**, run:

```bash
cd /workspaces/c2c-full-stack-102/lesson-11/app/client
npm install
npm start
```

This launches the React app on **http://localhost:3000**.

3. In **Terminal 2 (Server)**, run:

```bash
cd /workspaces/c2c-full-stack-102/lesson-11/app/server
npm install
npm run dev
```

This runs the Express server with `nodemon` on **http://localhost:3001**.

---

## Lesson Tasks: Cart Completion

You will work in `/workspaces/c2c-full-stack-102/lesson-11/app` for this lesson.

### 1. Cart Data Table

- Create a table in your MySQL database to store shopping cart items.
- Decide on columns (e.g., product id, name, price, etc.) and data types.

Example SQL:

```sql
CREATE TABLE cart (
	id INT AUTO_INCREMENT PRIMARY KEY,
	product_id INT,
	name VARCHAR(255),
	description TEXT,
	image_url VARCHAR(255),
	price DECIMAL(10,2)
);
```

### 2. Add to Cart Functionality

- Create a new API route (e.g., `/api/ecommerce/cart`) for adding items to the cart.
- Implement a function in the server to insert products into the cart table.
- In your client code, add an event listener to the "Add to Cart" button for each product.
- When clicked, send a POST request to your cart API route with product data.
- Test that items are correctly added to the cart table.

**Server (Express) Example:**

```js
// In server/index.js
app.post("/api/ecommerce/cart", (req, res) => {
  const { product } = req.body;
  const sql =
    "INSERT INTO cart (product_id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?)";
  const values = [
    product.id,
    product.name,
    product.description,
    product.image_url,
    product.price,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
      return;
    }
    res.json(result);
  });
});
```

**Client Example (React):**

```js
const addToCart = (product) => {
  axios
    .post("/api/ecommerce/cart", { product })
    .then((res) => {
      // Optionally update cart state
    })
    .catch((err) => console.log(err));
};
```

// Add this to your "Add to Cart" button:
// <button onClick={() => addToCart(product)}>Add to Cart</button>

### 3. Display Cart Items

- Update your cart display component to render cart items by pulling them from the cart data table.
- Use the product object (id, name, description, image_url, price) to display cart items.

**Server (Express) Example:**

```js
app.get("/api/ecommerce/cart", (req, res) => {
  db.query("SELECT * FROM cart", (err, results) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});
```

**Client Example (React):**

```js
useEffect(() => {
  axios
    .get("/api/ecommerce/cart")
    .then((res) => setCartList(res.data))
    .catch((err) => console.log(err));
}, []);

// Render cart items:
cartList.map((product) => (
  <div key={product.id}>
    <img src={product.image_url} alt={product.name} />
    <h2>{product.name}</h2>
    <h3>{product.description}</h3>
    <h3>{product.price}</h3>
    <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
  </div>
));
```

### 4. Remove from Cart

- Add a "Remove from Cart" button for each product in the cart.
- Create a function in the client to handle removal, sending a DELETE request to the server with the product's ID.
- Update the server to handle the DELETE request and remove the product from the cart table.
- Update the cart display after removal.

**Server (Express) Example:**

```js
app.delete("/api/ecommerce/cart/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM cart WHERE id = ?";
  db.query(sql, [productId], (err, result) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    res.json(result);
  });
});
```

**Client Example (React):**

```js
const removeFromCart = (productId) => {
  axios
    .delete(`/api/ecommerce/cart/${productId}`)
    .then((res) => {
      setCartList(cartList.filter((item) => item.id !== productId));
    })
    .catch((err) => console.log(err));
};
```

// Add this to your cart item:
// <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>

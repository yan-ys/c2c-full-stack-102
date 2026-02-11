# Full-Stack Lesson 9 Starter Guide

Lesson 9 focuses on wiring a React contact form to an Express API and persisting submissions to MySQL.

This guide is written to match the code in `lesson-09/app`.

## Folder Layout (Lesson 09)

- **`app/client/`** – React frontend that renders the contact form and calls the API.
- **`app/server/`** – Node/Express backend that exposes routes such as `POST /submit-form` and connects to MySQL.
- **`app/docs/CRA_REFERENCE.md`** – Archived Create React App reference documentation.

---

## Before You Start: Sync Your Fork

Because you are working from a fork, make sure your fork (and your Codespace) are up to date.

1. In the GitHub website, open **your fork** of this repo.
2. Click **Sync fork** (or **Fetch upstream**) and complete the prompts.
3. In your Codespace terminal (inside VS Code), pull the latest changes:

```bash
git pull
```

---

## Install & Run

### Step 1: Start the Client

```bash
cd app/client
npm install
npm start
```

This launches the React app on **http://localhost:3000**.

### Step 2: Start the Server

```bash
cd app/server
npm install
# Lesson 9 uses mysql2. If you see "Cannot find module 'mysql2'", run:
# npm install mysql2
npm run dev
```

This runs the Express server with `nodemon` on **http://localhost:3001**.

---

## Environment Variables

This project already uses `.env` files directly — no `.env.example` required.

### In `app/server/.env`

Update this file to match your local MySQL setup:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
PORT=3001
```

### In `app/client/.env`

Make sure your frontend knows where to find your backend:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

---

## Lesson 9 TODOs

You’ll complete these steps throughout the lesson. They mirror the sections outlined in your curriculum.

| Lesson Section | Goal                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------- |
| **1.1 / 1.2**  | Confirm folder structure and get both the client and server running.                      |
| **2.2**        | Create a MySQL database and a `contact` table (using the VS Code MySQL extension or SQL). |
| **2.3**        | Connect the backend to the database and add your `/submit-form` POST route.               |
| **2.4**        | Update the React contact form to send form data and show success/error messages.          |

---

## Section 2.2 – Create the Database and Table (VS Code + MySQL Extension)

These steps assume MySQL is already installed and running locally.

### Step 1 (Optional): Add a MySQL connection

If you already have a MySQL connection saved in the VS Code Database panel, you can skip to Step 2.

1. Open the **Database** view (the database icon in the Activity Bar).
2. Click **+** (New Connection) → choose **MySQL**.
3. Fill in values that match your `app/server/.env`:
   - **Host:** `127.0.0.1`
   - **Port:** `3306`
   - **User:** `root` (or your MySQL user)
   - **Password:** your MySQL password
4. Click **Test Connection**, then **Save**.

### Step 2: Create the schema + table in a query

1. In the Database view, right-click your connection → **New Query**.
2. Run the SQL below:

```sql
CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE IF NOT EXISTS contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  First_Name VARCHAR(100) NOT NULL,
  Last_Name VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If the extension prompts you to choose a default database, select **`ecommerce`**.

---

## Section 2.3 – Connect to the Database and Add the POST Route

Open **`app/server/index.js`**.

The starter currently contains a placeholder `POST /submit-form` route that returns `501 Not implemented yet`.

Update it to validate the request body and insert into the `ecommerce.contact` table. For example:

```js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2"); // ✅ use mysql2

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to your MySQL database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Handle POST request to save form data
app.post("/submit-form", (req, res) => {
  const { firstname, lastname, email, subject } = req.body;

  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO contact (First_Name, Last_Name, Email, Message)
    VALUES (?, ?, ?, ?)
  `;

  db.execute(sql, [firstname, lastname, email, subject], (err, results) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ message: "Database error." });
    }
    return res
      .status(201)
      .json({ message: "Form data inserted!", id: results.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
```

---

## Section 2.4 – Connect the React Contact Form

Open **`app/client/src/components/contactForm.jsx`**.  
This component already collects the form data in state and sends it to the server using Axios.

You can enhance it by adding simple feedback messages for users:

```jsx
const [status, setStatus] = useState({ type: null, message: "" });

const handleSubmit = (event) => {
  event.preventDefault();
  setStatus({ type: "loading", message: "Submitting…" });

  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/submit-form`, formData)
    .then(() => {
      setStatus({
        type: "success",
        message: "Thanks! We received your message.",
      });
      setFormData({ firstname: "", lastname: "", email: "", subject: "" });
    })
    .catch(() => {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    });
};

{
  /* Show messages under the form */
}
{
  status.type === "loading" && <p>Submitting…</p>;
}
{
  status.type === "success" && (
    <p style={{ color: "green" }}>{status.message}</p>
  );
}
{
  status.type === "error" && <p style={{ color: "red" }}>{status.message}</p>;
}
```

Then:

1. Start both apps (`npm start` in `app/client`, `npm run dev` in `app/server`).
2. Visit your contact page and submit the form.
3. In the VS Code Database view, refresh the `ecommerce` schema and confirm a new row appears in `contact`.

---

## Lesson 9 Alignment

| Lesson Section                                 | Description                                                |
| ---------------------------------------------- | ---------------------------------------------------------- |
| **Lesson 9: Ecommerce Project Intro / Do Now** | Locate your FS1 project or use this template.              |
| **Section 1.1: File Setup**                    | Work inside `app/client` and `app/server`.                 |
| **Section 1.2: Moving Files**                  | Verify both run correctly.                                 |
| **Section 2.1: Features that Need a Database** | Discuss which parts of the site will need a DB.            |
| **Section 2.2: Contact Form**                  | Create `contact` table for form submissions.               |
| **Section 2.3: Connect the Database**          | Implement the backend logic with `mysql2`.                 |
| **Section 2.4: Submitting Data**               | Send data from React form to server and confirm insertion. |

---

## Verification Steps

✅ `npm start` in `app/client` → loads on port 3000  
✅ `npm run dev` in `app/server` → runs on port 3001  
✅ Submitting form → row appears in `ecommerce.contact` (viewable in the VS Code Database panel)  
✅ Server returns `201` for a successful insert

---

## Additional Resources

- [`app/docs/CRA_REFERENCE.md`](app/docs/CRA_REFERENCE.md) – Original Create React App documentation
- Check your LMS or instructor notes for any lesson-specific MySQL credentials or example screenshots.

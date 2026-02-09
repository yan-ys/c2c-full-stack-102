const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// Database connection (Lesson 07 baseline)
// NOTE: This lesson uses the same dev container MySQL defaults as Lesson 07.
// Database/table expected:
// - database: example
// - table: customers (first_name, last_name, email, dob)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "example",
});

// Use cors, cross-origin resource sharing (CORS), to help Javascript interact with API
app.use(cors());

// Use express.json() to handle json request data
app.use(express.json());

// Use body-parser to handle url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

// (Optional) quick test route for inserting a row via the browser
app.get("/insert", (req, res) => {
  const sqlInsert =
    "INSERT INTO customers (first_name, last_name, email, dob) VALUES ('John', 'Doe', 'johndoe@example.com', '03-13-90');";

  db.query(sqlInsert, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB insert failed");
    }

    res.send("Inserted a test row");
  });
});

// Insert route used by the React client
app.post("/api/insert", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const dob = req.body.dob;

  const sqlInsert =
    "INSERT INTO customers (first_name, last_name, email, dob) VALUES (?, ?, ?, ?);";

  db.query(sqlInsert, [firstName, lastName, email, dob], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    res.status(201).json({ insertedId: result.insertId });
  });
});

// GET route to handle searching for customers by last name
app.get("/api/customers/search", (req, res) => {
  const lastName = req.query.lastName;
  const query = "SELECT * FROM customers WHERE last_name = ?";

  db.query(query, [lastName], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

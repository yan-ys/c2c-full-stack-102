const express = require("express");

const app = express();
app.use(express.json());

// Lesson 5 starter: server exists as a placeholder.
// In later lessons you will add routes and connect to your database.
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 5000;

// Set up middleware
app.use(cors());
app.use(express.json());

// Open the SQLite database
const db = new sqlite3.Database("HoyaHack25a/frontend/src/databases/prescripts.db");

// Endpoint to insert the scanned data into the database
app.post("/api/scan", (req, res) => {
  const { number, name, medicine, dosage, frequency } = req.body;

  // Prepare the SQL query to insert data
  const sql = `INSERT INTO prescriptions (number, name, medicine, dosage, frequency) VALUES (?, ?, ?, ?, ?)`;

  // Run the query to insert data
  db.run(sql, [number, name, medicine, dosage, frequency], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, number, name, medicine, dosage, frequency });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
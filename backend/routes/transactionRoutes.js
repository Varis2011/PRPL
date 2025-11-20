import express from "express";
import pool from "../db.js"; // PostgreSQL connection

const router = express.Router();

// Helper function to format amount as IDR
const formatIDR = (amount) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
};

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions ORDER BY date DESC");

    // Add formatted amount to each row
    const formattedRows = result.rows.map((row) => ({
      ...row,
      amountFormatted: formatIDR(Number(row.amount)),
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error("Error reading transaction data:", err);
    res.status(500).json({ message: "Transaction read error", error: err.message });
  }
});

// POST new transaction
router.post("/", async (req, res) => {
  const { title, amount, type, category, description, attachment, date } = req.body;

  // Validation: required fields
  if (!title || !amount || !type) {
    return res.status(400).json({ message: "title, amount, and type are required" });
  }

  try {
    // ✅ Numeric BIGINT ID generator
    const id = Date.now(); // e.g., 1731498825123 (pure number, safe for BIGINT)
    const numericAmount = Number(amount);

    if (isNaN(numericAmount)) {
      return res.status(400).json({ message: "Amount must be a valid number" });
    }

    const result = await pool.query(
      `INSERT INTO transactions
        (id, title, amount, type, category, description, attachment, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        id,
        title,
        numericAmount,
        type,
        category || "Uncategorized",
        description || "",
        attachment || null,
        date || new Date().toISOString().split("T")[0], // YYYY-MM-DD
      ]
    );

    const transaction = result.rows[0];
    transaction.amountFormatted = formatIDR(transaction.amount);

    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error writing transaction data:", err);
    res.status(500).json({ message: "Transaction write error", error: err.message });
  }
});

// DELETE transaction by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Transaction ID is required" });

  try {
    const result = await pool.query(
      "DELETE FROM transactions WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully", deleted: result.rows[0] });
  } catch (err) {
    console.error("Error deleting transaction data:", err);
    res.status(500).json({ message: "Transaction delete error", error: err.message });
  }
});

export default router;

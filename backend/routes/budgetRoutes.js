// backend/routes/budgetRoutes.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all budgets
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM budgets_fixed ORDER BY id DESC");
    const budgets = result.rows.map((b) => ({
      ...b,
      amount: Number(b.amount),
      total_amount: Number(b.total_amount),
      unexpected_percent: Number(b.unexpected_percent)
    }));
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching budgets", error: err.message });
  }
});

// POST new budget
router.post("/", async (req, res) => {
  const { title, amount, category, description, unexpected_percent, total_amount, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO budgets_fixed 
        (title, amount, category, description, unexpected_percent, total_amount, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        title,
        Number(amount),
        category,
        description,
        Number(unexpected_percent),
        Number(total_amount),
        status || "pending"
      ]
    );

    const budget = result.rows[0];
    budget.amount = Number(budget.amount);
    budget.total_amount = Number(budget.total_amount);
    budget.unexpected_percent = Number(budget.unexpected_percent);

    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Error creating budget", error: err.message });
  }
});

// PUT update budget
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const setString = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

  try {
    const result = await pool.query(
      `UPDATE budgets_fixed SET ${setString} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const budget = result.rows[0];
    budget.amount = Number(budget.amount);
    budget.total_amount = Number(budget.total_amount);
    budget.unexpected_percent = Number(budget.unexpected_percent);

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Error updating budget", error: err.message });
  }
});

// DELETE a budget
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM budgets_fixed WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting budget", error: err.message });
  }
});

export default router;

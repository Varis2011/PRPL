import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const budgetsResult = await pool.query(
      "SELECT * FROM budgets_fixed WHERE status = 'approved' ORDER BY id DESC"
    );
    const budgets = budgetsResult.rows;

    if (budgets.length === 0) {
      return res.json({
        totalBudget: 0,
        totalIncome: 0,
        totalExpense: 0,
        remainingBudget: 0,
        latestBudget: null,
      });
    }

    const latestName = budgets[0].title.split(" - ")[0];
    const latestBudgetRows = budgets.filter(b => b.title.startsWith(latestName));

    const allocations = latestBudgetRows.map(b => ({
      title: b.category,
      percentage: ((b.amount / b.total_amount) * 100).toFixed(2),
      amount: b.amount,
    }));

    const totalBudget = latestBudgetRows.reduce((sum, b) => sum + Number(b.total_amount || 0), 0);

    const trxResult = await pool.query("SELECT * FROM transactions");
    const transactions = trxResult.rows;

    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalExpense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const remainingBudget = totalBudget + totalIncome - totalExpense;

    res.json({
      totalBudget,
      totalIncome,
      totalExpense,
      remainingBudget,
      latestBudget: {
        name: latestName,
        totalAmount: totalBudget,
        unexpectedExpensePercent: latestBudgetRows[0].unexpected_percent || 0,
        allocations,
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      error: "Failed to fetch dashboard data",
      details: err.message,
    });
  }
});

export default router;

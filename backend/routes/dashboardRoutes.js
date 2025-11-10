// backend/routes/dashboardRoutes.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const budgetsFile = path.resolve('./backend/data/budgets.json');
const transactionsFile = path.resolve('./backend/data/transaction.json');

router.get('/', (req, res) => {
  const budgets = JSON.parse(fs.readFileSync(budgetsFile, 'utf8') || '[]');
  const transactions = JSON.parse(fs.readFileSync(transactionsFile, 'utf8') || '[]');

  const totalBudget = budgets
    .filter((b) => b.status === 'approved')
    .reduce((sum, b) => sum + Number(b.amount), 0);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remainingBudget = totalBudget + totalIncome - totalExpense;

  res.json({
    totalBudget,
    totalIncome,
    totalExpense,
    remainingBudget,
  });
});

export default router;

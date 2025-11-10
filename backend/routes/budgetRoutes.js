// backend/routes/budgetRoutes.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();
const filePath = path.join(__dirname, 'data', 'budget.json');

// Utility function
function readBudgets() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBudgets(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all budgets
router.get('/', (req, res) => {
  const budgets = readBudgets();
  res.json(budgets);
});

// POST new budget
router.post('/', (req, res) => {
  const budgets = readBudgets();
  const newBudget = {
    id: Date.now(),
    ...req.body,
    status: 'waiting', // default to waiting for approval
  };
  budgets.push(newBudget);
  writeBudgets(budgets);
  res.status(201).json(newBudget);
});

// PUT update budget (including status change)
router.put('/:id', (req, res) => {
  const budgets = readBudgets();
  const id = parseInt(req.params.id);
  const index = budgets.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  // Preserve existing budget but allow status updates
  budgets[index] = { ...budgets[index], ...req.body };
  writeBudgets(budgets);
  res.json(budgets[index]);
});

// DELETE a budget
router.delete('/:id', (req, res) => {
  const budgets = readBudgets();
  const id = parseInt(req.params.id);
  const filtered = budgets.filter((b) => b.id !== id);
  writeBudgets(filtered);
  res.json({ message: 'Budget deleted' });
});

export default router;

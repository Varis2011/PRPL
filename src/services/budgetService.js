// src/services/budgetService.js

// 1. Automatic Switch: 
// If deployed (Production), use Railway. If local (Dev), use Localhost.
const API_URL = import.meta.env.PROD 
  ? "https://prpl-production.up.railway.app/api/budgets" 
  : "http://localhost:5000/api/budgets";

export const getBudgets = async () => {
  const res = await fetch(API_URL);
  // Optional: Check if the response is OK to avoid "Unexpected token" errors
  if (!res.ok) throw new Error('Failed to fetch budgets'); 
  return await res.json();
};

export const createBudget = async (budget) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(budget),
  });
  return await res.json();
};

export const updateBudget = async (id, updates) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return await res.json();
};

export const deleteBudget = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
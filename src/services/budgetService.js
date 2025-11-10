// src/services/budgetService.js
const API_URL = 'http://localhost:5000/api/budgets';

export const getBudgets = async () => {
  const res = await fetch(API_URL);
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

// src/pages/BudgetApprovalPage.jsx
import { useEffect, useState } from 'react';
import { getBudgets, updateBudget } from '../services/budgetService';
import { Check, XCircle } from 'lucide-react';

const BudgetApprovalPage = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    const data = await getBudgets();
    // only show pending or waiting budgets
    setBudgets(data.filter((b) => b.status === "pending" || b.status === "waiting"));
  };

  const handleApprove = async (id) => {
  const budget = budgets.find((b) => b.id === id);
  await updateBudget(id, { ...budget, status: "approved" }); // ✅ merge full data
  loadBudgets();
};

 const handleReject = async (id) => {
 const budget = budgets.find((b) => b.id === id);
 await updateBudget(id, { ...budget, status: "rejected" });
 loadBudgets();
};

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Budget Approvals</h2>

      {budgets.length === 0 ? (
        <p className="text-gray-500 text-lg">No budgets pending approval.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800">{budget.name}</h3>
              <p className="text-gray-600 mt-1">Category: {budget.category}</p>
              <p className="text-gray-600">Amount: Rp {budget.amount ? budget.amount.toLocaleString('id-ID') : "N/A"}</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleApprove(budget.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Check size={16} /> Approve
                </button>
                <button
                  onClick={() => handleReject(budget.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetApprovalPage;

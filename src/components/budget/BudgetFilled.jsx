// src/components/budget/BudgetFilled.jsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Trash2, Edit2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetFilled = ({ budgets, onEdit, onDelete }) => {
  
  // 1. FILTER: Only show APPROVED items
  const safeBudgets = budgets || [];
  const approvedBudgets = safeBudgets.filter(
    (b) => b.status && b.status.toLowerCase() === 'approved'
  );

  if (approvedBudgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white rounded-lg border border-gray-200 m-6">
        <p className="text-lg font-medium">No approved budget plans found.</p>
      </div>
    );
  }

  // 2. SORT: Newest first
  const sortedApproved = [...approvedBudgets].sort((a, b) => b.id - a.id);
  
  // 3. IDENTIFY LATEST PLAN
  // Since we fixed the form, the title will be exactly "December"
  const latestBudget = sortedApproved[0];
  const currentPlanTitle = latestBudget.title;

  // 4. GROUP: Show all categories for "December"
  const currentPlanItems = sortedApproved.filter(
    (b) => b.title === currentPlanTitle
  );

  // --- CHART DATA ---
  const chartData = {
    labels: currentPlanItems.map((b) => b.category),
    datasets: [{
      data: currentPlanItems.map((b) => b.amount),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#9CA3AF'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="p-6 space-y-8">
      {/* Visual Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Budget Allocation — {currentPlanTitle}</h2>
        <div className="w-full max-w-xs md:max-w-sm">
          <Pie data={chartData} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
           <h3 className="font-bold text-lg text-gray-700">Budget Allocation</h3>
           <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase font-bold">{currentPlanTitle}</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4">Category</th>
              <th className="p-4">Percentage</th>
              <th className="p-4">Amount (IDR)</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentPlanItems.map((budget) => (
              <tr key={budget.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{budget.category}</td>
                <td className="p-4 text-gray-600">
                  {budget.total_amount 
                    ? `${((budget.amount / budget.total_amount) * 100).toFixed(1)}%` 
                    : '-'}
                </td>
                <td className="p-4 font-mono text-gray-700">Rp {budget.amount.toLocaleString('id-ID')}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => onEdit && onEdit(budget)} className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => onDelete(budget.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Total Allocation</span>
          <span className="text-lg font-bold text-gray-800">
            Rp {currentPlanItems.reduce((sum, item) => sum + item.amount, 0).toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetFilled;
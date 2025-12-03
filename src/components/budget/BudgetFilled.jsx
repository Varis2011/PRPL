// src/components/budget/BudgetFilled.jsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Trash2, Edit2 } from 'lucide-react';
import BudgetPageHeader from "./BudgetPageHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

const formatRp = (value) => {
  if (!value || isNaN(value)) return "Rp 0";
  return "Rp " + Number(value).toLocaleString("id-ID");
};

const BudgetFilled = ({ budgets, onEdit, onDelete }) => {
  
  // 1. FILTER: Get only APPROVED budgets
  const safeBudgets = budgets || [];
  const approved = safeBudgets.filter((b) => b.status === "approved");

  if (approved.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Budget Allocation</h3>
        <p className="text-gray-500 text-sm italic">No approved budget available</p>
      </div>
    );
  }

  // 2. FIND LATEST: Sort by ID descending (Newest first)
  const sorted = [...approved].sort((a, b) => b.id - a.id);
  const latestItem = sorted[0];

  // 3. IDENTIFY TITLE: Extract the budget name (e.g., "End of The Year")
  // This strips the " - Category" suffix if it exists in your database
  const baseTitle = latestItem.title.includes(' - ') 
    ? latestItem.title.split(' - ')[0] 
    : latestItem.title;

  // 4. GROUP: Filter the list to show ALL categories for this specific budget
  const currentPlanItems = sorted.filter(b => {
    const bTitle = b.title.includes(' - ') ? b.title.split(' - ')[0] : b.title;
    return bTitle === baseTitle;
  });

  // 5. PREPARE DATA
  // We use the total_amount stored in the database row
  const total = Number(latestItem.total_amount) || 0;

  // Chart Data
  const chartData = {
    labels: currentPlanItems.map((b) => b.category),
    datasets: [{
      data: currentPlanItems.map((b) => b.amount),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#9CA3AF'],
      borderWidth: 1,
    }],
  };

  // Table Data
  const allocationData = currentPlanItems.map((item) => ({
    id: item.id,
    name: item.category,
    percent: `${((item.amount / total) * 100).toFixed(2)}%`,
    amount: formatRp(item.amount),
  }));

  // Add Unexpected Expenses Row (read from the first item)
  const unexpectedPercent = Number(latestItem.unexpected_percent) || 0;
  if (unexpectedPercent > 0) {
    allocationData.push({
      id: "unexpected",
      name: "Unexpected Expenses",
      percent: `${unexpectedPercent}%`,
      amount: formatRp((unexpectedPercent / 100) * total),
      isStatic: true // Flag to prevent deleting this row
    });
  }

  return (
    <div>
      <BudgetPageHeader onEdit={onEdit} />
      
      {/* 1. CHART SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Budget Allocation — {baseTitle}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Showing latest approved budget plan
        </p>
        <div className="w-full max-w-xs md:max-w-sm">
          <Pie data={chartData} />
        </div>
      </div>

      {/* 2. TABLE SECTION */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
           <h3 className="font-bold text-lg text-gray-700">Budget Details</h3>
           <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase font-bold">{baseTitle}</span>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Percentage</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allocationData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                <td className="p-4 text-gray-600">{item.percent}</td>
                <td className="p-4 font-mono text-gray-700">{item.amount}</td>
                <td className="p-4 text-right">
                   {!item.isStatic && (
                     <button 
                       onClick={() => onDelete && onDelete(item.id)}
                       className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                       title="Delete"
                     >
                       <Trash2 size={18} />
                     </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Summary */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Total Allocation</span>
          <span className="text-lg font-bold text-gray-800">
            {formatRp(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetFilled;
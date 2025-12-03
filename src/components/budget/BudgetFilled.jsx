// src/components/budget/BudgetFilled.jsx
import BudgetPageHeader from "./BudgetPageHeader";
import { Trash2 } from 'lucide-react'; // Needed to delete the old "Hello" entries

const formatRp = (value) => {
  if (!value || isNaN(value)) return "Rp 0";
  return "Rp " + Number(value).toLocaleString("id-ID");
};

// We receive 'budgets' from the parent component (Budget.jsx)
const BudgetFilled = ({ budgets, onEdit, onDelete }) => {
  
  // 1. FILTER: Only show APPROVED items
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

  // 3. SMART TITLE: Get the clean name (e.g. "December" or "hello")
  // This logic handles your old "hello - Infrastructure" data by stripping the ending
  const baseTitle = latestItem.title.includes(' - ') 
    ? latestItem.title.split(' - ')[0] 
    : latestItem.title;

  // 4. GROUP: Find ALL categories that belong to this newest budget
  const currentPlanItems = sorted.filter(b => {
    const bTitle = b.title.includes(' - ') ? b.title.split(' - ')[0] : b.title;
    return bTitle === baseTitle;
  });

  // 5. DATA PREP: Calculate totals and rows
  const total = Number(latestItem.total_amount) || 0;

  const allocationData = currentPlanItems.map((item) => ({
    id: item.id,
    name: item.category,
    percent: `${((item.amount / total) * 100).toFixed(2)}%`,
    amount: formatRp(item.amount),
  }));

  // Add "Unexpected" row manually (since it's a field, not a row)
  const unexpectedPercent = Number(latestItem.unexpected_percent) || 0;
  if (unexpectedPercent > 0) {
    allocationData.push({
      id: "unexpected",
      name: "Unexpected Expenses",
      percent: `${unexpectedPercent}%`,
      amount: formatRp((unexpectedPercent / 100) * total),
      isStatic: true // Cannot delete this row
    });
  }

  return (
    <div>
      <BudgetPageHeader onEdit={onEdit} />
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Budget Allocation — {baseTitle}
        </h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-sm text-gray-500 font-medium">Category</th>
              <th className="py-2 text-sm text-gray-500 font-medium">Percentage</th>
              <th className="py-2 text-sm text-gray-500 font-medium">Amount</th>
              <th className="py-2 text-sm text-gray-500 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allocationData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 font-medium text-gray-800">{item.name}</td>
                <td className="py-3 text-gray-600">{item.percent}</td>
                <td className="py-3 text-gray-800 font-medium">{item.amount}</td>
                <td className="py-3 text-right">
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
      </div>
    </div>
  );
};

export default BudgetFilled;
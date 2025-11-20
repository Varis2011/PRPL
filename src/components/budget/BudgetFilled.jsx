// src/components/budget/BudgetFilled.jsx
import { useEffect, useState } from "react";
import BudgetPageHeader from "./BudgetPageHeader";

const formatRp = (value) => {
  if (!value || isNaN(value)) return "Rp 0";
  return "Rp " + Number(value).toLocaleString("id-ID");
};

const BudgetFilled = ({ onEdit }) => {
  const [latestBudget, setLatestBudget] = useState(null);

  useEffect(() => {
    const fetchLatestBudget = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/budgets");
        const data = await res.json();
        const approved = data.filter((b) => b.status === "approved");
        const latest = approved[approved.length - 1];
        setLatestBudget(latest || null);
      } catch (err) {
        console.error("Error fetching budgets:", err);
      }
    };
    fetchLatestBudget();
  }, []);

  if (!latestBudget) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Budget Allocation
        </h3>
        <p className="text-gray-500 text-sm italic">
          No approved budget available
        </p>
      </div>
    );
  }

  const total = Number(latestBudget.total_amount) || 0;

  const allocations = [
    {
      title: latestBudget.category,
      percentage: ((latestBudget.amount / total) * 100).toFixed(2),
    },
  ];

  const allocationData = allocations.map((a) => ({
    name: a.title,
    percent: `${a.percentage}%`,
    amount: formatRp((a.percentage / 100) * total),
  }));

  const unexpectedPercent = Number(latestBudget.unexpected_percent) || 0;
  if (unexpectedPercent > 0) {
    allocationData.push({
      name: "Unexpected Expenses",
      percent: `${unexpectedPercent}%`,
      amount: formatRp((unexpectedPercent / 100) * total),
    });
  }

  return (
    <div>
      <BudgetPageHeader onEdit={onEdit} />
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Budget Allocation — {latestBudget.title}
        </h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-sm text-gray-500 font-medium">Category</th>
              <th className="py-2 text-sm text-gray-500 font-medium">Percentage</th>
              <th className="py-2 text-sm text-gray-500 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {allocationData.map((item) => (
              <tr key={item.name} className="border-b border-gray-100">
                <td className="py-3 font-medium text-gray-800">{item.name}</td>
                <td className="py-3 text-gray-600">{item.percent}</td>
                <td className="py-3 text-gray-800 font-medium text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetFilled;

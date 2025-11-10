// src/components/budget/BudgetFilled.jsx
import { useEffect, useState } from 'react';
import BudgetPageHeader from './BudgetPageHeader';
import BudgetChart from '../dashboard/BudgetChart';
import RecentTransactions from '../dashboard/RecentTransactions';

const formatRp = (value) => {
  if (!value || isNaN(value)) return 'Rp 0';
  return 'Rp ' + Number(value).toLocaleString('id-ID');
};

const BudgetFilled = ({ onEdit }) => {
  const [latestBudget, setLatestBudget] = useState(null);

  useEffect(() => {
    const fetchLatestBudget = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/budgets');
        const data = await response.json();

        const approvedBudgets = data.filter((b) => b.status === 'approved');
        const latest = approvedBudgets[approvedBudgets.length - 1];
        setLatestBudget(latest || null);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchLatestBudget();
  }, []);

  if (!latestBudget) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Budget Allocation</h3>
        <p className="text-gray-500 text-sm italic">No approved budget available</p>
      </div>
    );
  }

  // 🟢 Build allocation table from allocations array
  const total = Number(latestBudget.totalAmount) || 0;
  const allocations = latestBudget.allocations || [];

  const allocationData = allocations.map((a) => {
    const percent = parseFloat(a.percentage);
    const amount = total * (percent / 100);
    return {
      name: a.title,
      percent: `${percent}%`,
      amount: formatRp(amount),
    };
  });

  // Add unexpected expenses row
  const unexpectedPercent = Number(latestBudget.unexpectedExpensePercent) || 0;
  if (unexpectedPercent > 0) {
    const unexpectedAmount = total * (unexpectedPercent / 100);
    allocationData.push({
      name: 'Unexpected Expenses',
      percent: `${unexpectedPercent}%`,
      amount: formatRp(unexpectedAmount),
    });
  }

  return (
    <div>
      <BudgetPageHeader onEdit={onEdit} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <BudgetChart />

          {/* 🟢 Allocation Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Budget Allocation — {latestBudget.name}
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

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default BudgetFilled;

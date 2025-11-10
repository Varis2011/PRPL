import { useEffect, useState } from "react";
import { getBudgets } from "../../services/budgetService";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

const BudgetChart = () => {
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    async function fetchApprovedBudget() {
      try {
        const budgets = await getBudgets();
        // ✅ Find the latest approved budget
        const approved = budgets
          .filter((b) => b.status === "approved")
          .sort((a, b) => b.id - a.id)[0];

        setBudget(approved || null);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    }

    fetchApprovedBudget();
  }, []);

  if (!budget) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
        No approved budget available.
      </div>
    );
  }

  // ✅ Prepare chart data
  const chartData = budget.allocations.map((a, index) => ({
  name: a.title,
  value: (budget.totalAmount * (parseFloat(a.percentage) || 0)) / 100,
  color: COLORS[index % COLORS.length],
}));


  // Add unexpected expense
  chartData.push({
    name: "Unexpected Expenses",
    value:
      (budget.totalAmount * budget.unexpectedExpensePercent) / 100 || 0,
    color: "#9CA3AF",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Budget Distribution — {budget.name}
      </h3>
      <div className="flex justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}/>
          <Legend />
        </PieChart>
      </div>
      <p className="text-center text-gray-500 mt-4">
        Showing latest approved budget: <strong>{budget.name}</strong>
      </p>
    </div>
  );
};

export default BudgetChart;

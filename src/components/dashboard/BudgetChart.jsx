// src/components/budget/BudgetChart.jsx
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
        const approved = budgets.filter((b) => b.status === "approved");
        if (!approved.length) {
          setBudget(null);
          return;
        }

        // Find the latest budget name prefix
        // e.g., "november - Infrastructure" → "november"
        const sorted = approved.sort((a, b) => b.id - a.id);
        const latestPrefix = sorted[0].title.split(" - ")[0];

        // Get all rows that belong to this budget
        const latestBudgetRows = approved.filter((b) =>
          b.title.startsWith(latestPrefix)
        );

        const totalAmount = latestBudgetRows[0].total_amount;
        const unexpectedExpensePercent = latestBudgetRows[0].unexpected_percent;

        // Build allocations from all categories
        const allocations = latestBudgetRows.map((b) => ({
          title: b.category,
          percentage: ((b.amount / totalAmount) * 100).toFixed(2),
        }));

        setBudget({ name: latestPrefix, totalAmount, unexpectedExpensePercent, allocations });
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

  const chartData = budget.allocations.map((a, index) => ({
    name: a.title,
    value: (budget.totalAmount * parseFloat(a.percentage)) / 100,
    color: COLORS[index % COLORS.length],
  }));

  chartData.push({
    name: "Unexpected Expenses",
    value: (budget.totalAmount * budget.unexpectedExpensePercent) / 100,
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
          <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`} />
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

// src/components/budget/BudgetCreationForm.jsx
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

const initialCategories = [
  { id: 1, title: "Infrastructure", percentage: "" },
  { id: 2, title: "Citizen", percentage: "" },
  { id: 3, title: "Administrative", percentage: "" },
  { id: 4, title: "Social Program", percentage: "" },
];

const BudgetCreationForm = ({ onSubmit, onBack }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalFund = 1_000_000_000; // Rp 100B
  const unexpectedPercent = 10;

  const handleCategoryChange = (id, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, percentage: value } : cat
      )
    );
  };

  const handleAddCategory = () => {
    const newId = categories.length + 1;
    setCategories([
      ...categories,
      { id: newId, title: "New Category", percentage: "" },
    ]);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const budgetTitle = prompt("Enter a name for this budget:") || "Untitled";

      for (let cat of categories) {
        const percent = Number(cat.percentage) || 0;
        const amount = Math.floor((totalFund * percent) / 100);

        const payload = {
          title: `${budgetTitle} - ${cat.title}`, // MUST BE title
          amount,
          category: cat.title,
          description: `Allocation for ${cat.title}`,
          unexpected_percent: unexpectedPercent,
          total_amount: totalFund,
          status: "pending",
        };

        const res = await fetch("http://localhost:5000/api/budgets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || `Failed to submit ${cat.title}`);
        }
      }

      alert("✅ Budget submitted successfully!");
      onSubmit();
    } catch (err) {
      console.error(err);
      alert("Error submitting budget: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h2 className="text-2xl font-semibold">Create Budget</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Date</h3>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
            required
          />
          <span className="text-gray-500">→</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Allocation</h3>
        <div className="space-y-4">
          {categories.map((cat) => {
            const amount = Math.floor((totalFund * (Number(cat.percentage) || 0)) / 100);
            return (
              <div key={cat.id} className="flex items-center gap-4">
                <input
                  type="text"
                  value={cat.title}
                  onChange={(e) =>
                    setCategories((prev) =>
                      prev.map((c) =>
                        c.id === cat.id ? { ...c, title: e.target.value } : c
                      )
                    )
                  }
                  className="w-1/3 input-field"
                  placeholder="Category Name"
                  required
                />
                <div className="relative w-1/3">
                  <input
                    type="number"
                    placeholder="Percentage"
                    value={cat.percentage}
                    onChange={(e) => handleCategoryChange(cat.id, e.target.value)}
                    className="input-field pl-4"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
                <div className="w-1/3">
                  <p className="text-lg font-medium text-gray-800">
                    Rp {amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            onClick={handleAddCategory}
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
          >
            <Plus size={20} />
            <span>Add new category</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Unexpected Expenses</h3>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={unexpectedPercent}
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-lg text-center font-medium"
          />
          <span className="text-xl font-medium">%</span>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              Rp {(totalFund * (unexpectedPercent / 100)).toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-500">
              The amount is auto-generated, allocating {unexpectedPercent}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          <span className="text-sm text-gray-500">Available fund</span>
          <p className="text-xl font-semibold text-gray-800">
            Rp {totalFund.toLocaleString("id-ID")}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Ask for Approval"}
        </button>
      </div>
    </div>
  );
};

export default BudgetCreationForm;

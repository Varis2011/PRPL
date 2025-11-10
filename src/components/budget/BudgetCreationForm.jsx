import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

// Initial mock categories
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

  // Handle input for category percentage
  const handleCategoryChange = (id, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, percentage: value } : cat
      )
    );
  };

  // Add new category dynamically
  const handleAddCategory = () => {
    const newId = categories.length + 1;
    setCategories([...categories, { id: newId, title: "New Category", percentage: "" }]);
  };

  const handleSubmit = async () => {
  try {
    setIsSubmitting(true);

    // Optional: prompt the user to name their budget
    const name = prompt("Enter a name for this budget (e.g., November Operations Budget):");

    const totalAmount = categories.reduce((sum, item) => sum + (item.amount || 0), 0);
    
    const totalFund = 100000000000; // Rp 100 billion for example

    const payload = {
      id: Date.now(),
      name: name || "Unnamed Budget",
      startDate,
      endDate,
      allocations: categories,
      unexpectedExpensePercent: 10,
      totalAmount: totalFund, // ✅ correct value
      status: "pending",
};


    const res = await fetch("http://localhost:5000/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to submit budget");

    const data = await res.json();
    console.log("✅ Budget saved:", data);
    onSubmit(); // update the parent page to "waiting"
  } catch (err) {
    console.error(err);
    alert("Error submitting budget");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h2 className="text-2xl font-semibold">Create Budget</h2>
      </div>

      {/* Date Range */}
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

      {/* Allocation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Allocation</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4">
              <h4 className="w-1/3 text-gray-600">{cat.title}</h4>
              <div className="relative w-1/3">
                <input
                  type="number"
                  placeholder="Percentage"
                  value={cat.percentage}
                  onChange={(e) =>
                    handleCategoryChange(cat.id, e.target.value)
                  }
                  className="input-field pl-4"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  %
                </span>
              </div>
              <div className="w-1/3">
                <p className="text-lg font-medium text-gray-800">
                  Rp 100,000,000
                </p>
              </div>
            </div>
          ))}
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

      {/* Unexpected Expenses */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Unexpected Expenses
        </h3>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value="10"
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-lg text-center font-medium"
          />
          <span className="text-xl font-medium">%</span>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              Rp 100,000,000
            </p>
            <p className="text-sm text-gray-500">
              The amount is auto-generated, allocating 10%
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          <span className="text-sm text-gray-500">Available fund</span>
          <p className="text-xl font-semibold text-gray-800">
            Rp 100,000,000,000
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

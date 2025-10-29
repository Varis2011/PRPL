// src/components/budget/BudgetCreationForm.jsx
import { ArrowLeft, Plus } from 'lucide-react';

// Mock data for categories
const categories = [
  { id: 1, title: 'Infrastructure' }, 
  { id: 2, title: 'Citizen' }, 
  { id: 3, title: 'Administrative' }, 
  { id: 4, title: 'Social Program' }, 
];

const BudgetCreationForm = ({ onSubmit, onBack }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
      {/* 1. Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-700" /> 
        </button>
        <h2 className="text-2xl font-semibold">Create Budget</h2> 
      </div>

      {/* 2. Date Range */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Date</h3>
        <div className="flex items-center gap-4">
          <input type="date" className="input-field" placeholder="Start date" /> 
          <span className="text-gray-500">→</span> 
          <input type="date" className="input-field" placeholder="End date" />
        </div>
      </div>

      {/* 3. Allocation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Allocation</h3> 
        <div className="space-y-4">
          {categories.map((cat) => (
            <AllocationCategory key={cat.id} title={cat.title} />
          ))}
          <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800">
            <Plus size={20} />
            <span>Add new category</span> [cite: 259]
          </button>
        </div>
      </div>
      
      {/* 4. Unexpected Expenses */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Unexpected Expenses</h3>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value="10" 
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-lg text-center font-medium"
          />
          <span className="text-xl font-medium">%</span>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">Rp 100,000,000</p> 
            <p className="text-sm text-gray-500">The amount is auto-generated, allocating 10%</p> 
          </div>
        </div>
      </div>

      {/* 5. Footer & Submit */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          <span className="text-sm text-gray-500">Available fund</span>
          <p className="text-xl font-semibold text-gray-800">Rp 100,000,000,000</p>
        </div>
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ask for Approval [cite: 266]
        </button>
      </div>
    </div>
  );
};

// Helper component for the category inputs
const AllocationCategory = ({ title }) => (
  <div className="flex items-center gap-4">
    <h4 className="w-1/3 text-gray-600">{title}</h4>
    <div className="relative w-1/3">
      <input type="text" placeholder="Percentage" className="input-field pl-4" /> 
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span> 
    </div>
    <div className="w-1/3">
      <p className="text-lg font-medium text-gray-800">Rp 100,000,000</p> 
    </div>
  </div>
);

// Helper CSS for inputs (add to src/index.css)
/*
  @layer components {
    .input-field {
      @apply w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
    }
  }
*/

export default BudgetCreationForm;
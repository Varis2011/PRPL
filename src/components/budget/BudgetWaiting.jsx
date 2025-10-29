// src/components/budget/BudgetWaiting.jsx
import BudgetPageHeader from './BudgetPageHeader';
import { Printer, Check } from 'lucide-react';

const BudgetWaiting = () => {
  return (
    <div>
      <BudgetPageHeader onEdit={() => alert('Edit clicked!')} />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Waiting for Approval...</h2> 
        <p className="text-gray-500 mb-8 max-w-sm">
          Your budget has been sent to be approved 
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200">
            <Printer size={18} />
            <span>Print budget plan</span> 
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
            <Check size={18} />
            <span>Approve budget manually</span> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetWaiting;
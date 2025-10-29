// src/components/common/EmptyState.jsx
import { Plus } from 'lucide-react';

const EmptyState = ({ title, message, buttonText, onButtonClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">{message}</p>
        <button onClick={onButtonClick} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
// src/components/dashboard/QuickActions.jsx
import { Plus, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const QuickActions = () => {
  const { setIsAddTransactionModalOpen } = useApp();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
      <div className="space-y-4">
        {/* Add Transaction [cite: 194-197] */}
        <ActionCard
          icon={<Plus size={20} />}
          title="Add transaction"
          description="Create a new transaction"
          onClick={() => setIsAddTransactionModalOpen(true)}
        />
      
      
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, description, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-4 p-4 w-full rounded-lg hover:bg-gray-50 text-left">
    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </button>
);

export default QuickActions;
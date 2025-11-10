import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TransactionsTable from '../components/transactions/TransactionsTable';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import { useState } from 'react';

const Transactions = () => {
  const { setIsAddTransactionModalOpen } = useApp();
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
        <button
          onClick={() => setIsAddTransactionModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add transaction</span>
        </button>
      </div>
      <TransactionsTable key={refresh} />
      <AddTransactionModal onAdded={() => setRefresh((prev) => !prev)} />
    </div>
  );
};

export default Transactions;

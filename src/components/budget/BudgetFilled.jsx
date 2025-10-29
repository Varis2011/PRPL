// src/components/budget/BudgetFilled.jsx
import BudgetPageHeader from './BudgetPageHeader';
import BudgetChart from '../dashboard/BudgetChart'; // Reusing from Dashboard
import RecentTransactions from '../dashboard/RecentTransactions'; // Reusing from Dashboard

// Mock data for allocation table
const allocationData = [
  { name: 'Infrastructure', percent: '20%', amount: 'Rp 100,000,000' },
  { name: 'Citizen', percent: '20%', amount: 'Rp 100,000,000' },
  { name: 'Administrative', percent: '20%', amount: 'Rp 100,000,000' },
  { name: 'Social Program', percent: '20%', amount: 'Rp 100,000,000' },
  { name: 'Unexpected Expenses', percent: '10%', amount: 'Rp 100,000,000' },
];

const BudgetFilled = () => {
  return (
    <div>
      <BudgetPageHeader onEdit={() => alert('Edit clicked!')} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart & Allocation */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <BudgetChart /> {/* Reusing the chart component */}
          
          {/* Budget Allocation Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Budget Allocation</h3>
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
        
        {/* Right Column: Transactions */}
        <div className="lg:col-span-1">
          <RecentTransactions /> {/* Reusing the transactions component */}
        </div>
      </div>
    </div>
  );
};

export default BudgetFilled;
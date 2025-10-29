// src/components/dashboard/RecentTransactions.jsx
// Mock data based on the design [cite: 203]
const transactions = [
  { desc: 'Transaction 1', cat: 'Infrastructure', date: '2024/04/01', amount: '- Rp 10,000,000', negative: true },
  { desc: 'Transaction 2', cat: 'Citizen', date: '2024/03/29', amount: '- Rp 10,000,000', negative: true },
  { desc: 'Transaction 3', cat: 'Infrastructure', date: '2024/03/29', amount: '- Rp 10,000,000', negative: true },
  { desc: 'Transaction 7', cat: 'Income', date: '2024/03/21', amount: '+ Rp 10,000,000', negative: false },
];

const RecentTransactions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h3>
      <table className="w-full text-left">
        <thead className="text-xs text-gray-500 uppercase">
          <tr>
            <th className="py-2">Description</th>
            <th className="py-2">Category</th>
            <th className="py-2">Date</th>
            <th className="py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-3 font-medium text-gray-800">{t.desc}</td>
              <td className="py-3 text-gray-600">{t.cat}</td>
              <td className="py-3 text-gray-600">{t.date}</td>
              <td className={`py-3 font-medium text-right ${t.negative ? 'text-red-600' : 'text-green-600'}`}>
                {t.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
// src/components/transactions/TransactionsTable.jsx
import { Download } from 'lucide-react';
// Mock data based on design 
const transactions = [
  // ... (Same data as RecentTransactions, but we can add more)
  { id: 1, desc: 'Transaction 1', cat: 'Infrastructure', date: '2024/04/01', amount: '- Rp 10,000,000', negative: true, attach: 'Doc.pdf' },
  { id: 2, desc: 'Transaction 2', cat: 'Citizen', date: '2024/03/29', amount: '- Rp 10,000,000', negative: true, attach: 'Doc.pdf' },
  { id: 3, desc: 'Transaction 3', cat: 'Infrastructure', date: '2024/03/29', amount: '- Rp 10,000,000', negative: true, attach: 'Doc.pdf' },
  { id: 7, desc: 'Transaction 7', cat: 'Income', date: '2024/03/21', amount: '+ Rp 10,000,000', negative: false, attach: 'Doc.pdf' },
  // ... add more to show pagination
];

const TransactionsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Date</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Attachment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="p-4"><input type="checkbox" /></td>
              <td className="p-4 font-medium text-gray-800">{t.desc}</td>
              <td className="p-4 text-gray-600">{t.cat}</td>
              <td className="p-4 text-gray-600">{t.date}</td>
              <td className={`p-4 font-medium ${t.negative ? 'text-red-600' : 'text-green-600'}`}>
                {t.amount}
              </td>
              <td className="p-4">
                <button className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Download size={16} />
                  <span>{t.attach}</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination (from design ) */}
      <div className="flex items-center justify-between p-4 text-sm text-gray-600">
        <span>Total 85 items</span>
        <div className="flex items-center gap-2">
          <button className="p-2">&lt;</button>
          <button className="p-2 w-8 h-8 rounded bg-blue-100 text-blue-600">1</button>
          {/* ... other page numbers ... */}
          <button className="p-2">...</button>
          <button className="p-2">20</button>
          <button className="p-2">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
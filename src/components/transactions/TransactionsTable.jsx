import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { getTransactions, deleteTransaction } from '../../services/transactionService';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, id: null });
  const tableRef = useRef(null);

  useEffect(() => {
    getTransactions().then((data) => {
      console.log("Fetched transactions:", data);
      setTransactions(data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setContextMenu({ visible: false, x: 0, y: 0, id: null });
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  // Hide menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setContextMenu({ visible: false, x: 0, y: 0, id: null });
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleRightClick = (e, id) => {
    e.preventDefault();

    // Get bounding box of table container
    const rect = tableRef.current?.getBoundingClientRect();

    // Calculate relative position (keep inside table)
    const x = Math.min(e.clientX - rect.left, rect.width - 150); // menu width approx
    const y = Math.min(e.clientY - rect.top, rect.height - 40); // menu height approx

    setContextMenu({ visible: true, x, y, id });
  };

  return (
    <div ref={tableRef} className="relative bg-white rounded-lg shadow-sm overflow-auto">
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
            <tr
              key={t.id}
              onContextMenu={(e) => handleRightClick(e, t.id)}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="p-4"><input type="checkbox" /></td>
              <td className="p-4 font-medium text-gray-800">{t.title}</td>
              <td className="p-4 text-gray-600">{t.category}</td>
              <td className="p-4 text-gray-600">{new Date(t.date).toLocaleDateString()}</td>
              <td className={`p-4 font-medium ${t.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                {t.type === 'expense' ? '- ' : '+ '}Rp {Number(t.amount).toLocaleString()}
              </td>
              <td className="p-4">
                {t.attachment ? (
                  <button className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Download size={16} />
                    <span>{t.attachment}</span>
                  </button>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {contextMenu.visible && (
        <div
          className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            minWidth: '150px',
          }}
          onMouseLeave={() => setContextMenu({ visible: false, x: 0, y: 0, id: null })}
        >
          <button
            onClick={() => handleDelete(contextMenu.id)}
            className="block px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
          >
            Delete Transaction
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;

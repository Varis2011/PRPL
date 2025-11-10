import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionService";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        // Sort by date (newest first)
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // Get only the 4 most recent
        setTransactions(sorted.slice(0, 4));
      } catch (error) {
        console.error("❌ Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Recent Transactions
      </h3>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent transactions yet.</p>
      ) : (
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
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-gray-100">
                <td className="py-3 font-medium text-gray-800">{t.title}</td>
                <td className="py-3 text-gray-600">{t.category}</td>
                <td className="py-3 text-gray-600">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td
                  className={`py-3 font-medium text-right ${
                    t.type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {t.type === "expense" ? "- " : "+ "}Rp{" "}
                  {Number(t.amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentTransactions;

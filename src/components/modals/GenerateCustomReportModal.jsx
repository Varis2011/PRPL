// src/components/modals/GenerateCustomReportModal.jsx
import { X, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Mock data for the table
const transactions = [
  { id: 1, desc: 'Transaction 1', cat: 'Infrastructure', date: '2024/04/01', amount: '- Rp 10,000,000', negative: true },
  { id: 2, desc: 'Transaction 2', cat: 'Citizen', date: '2024/03/29', amount: '- Rp 10,000,000', negative: true },
  { id: 3, desc: 'Transaction 3', cat: 'Infrastructure', date: '2024/03/29', amount: '- Rp 10,000,000', negative: true },
  { id: 4, desc: 'Transaction 4', cat: 'Development', date: '2024/03/27', amount: '- Rp 10,000,000', negative: true },
  { id: 7, desc: 'Transaction 7', cat: 'Income', date: '2024/03/21', amount: '+ Rp 10,000,000', negative: false },
];

const GenerateCustomReportModal = ({ onGenerate }) => {
  const { isGenerateReportModalOpen, setIsGenerateReportModalOpen } = useApp();

  if (!isGenerateReportModalOpen) return null;

  const handleGenerate = () => {
    // Call the onGenerate prop (which will set the page to 'generating')
    onGenerate();
    // Close the modal
    setIsGenerateReportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Custom Range Report</h2>
          <button onClick={() => setIsGenerateReportModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Table */}
        <div className="overflow-y-auto p-6">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="p-3"><input type="checkbox" /></th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3"><input type="checkbox" /></td>
                    <td className="p-3 font-medium text-gray-800">{t.desc}</td>
                    <td className="p-3 text-gray-600">{t.cat}</td>
                    <td className="p-3 text-gray-600">{t.date}</td>
                    <td className={`p-3 font-medium text-right ${t.negative ? 'text-red-600' : 'text-green-600'}`}>
                      {t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 text-sm text-gray-600">
            <span>Total 85 items</span>
            <div className="flex items-center gap-2">
              <button className="p-2">&lt;</button>
              <button className="p-2 w-8 h-8 rounded bg-blue-100 text-blue-600">1</button>
              <button className="p-2">...</button>
              <button className="p-2">20</button>
              <button className="p-2">&gt;</button>
            </div>
          </div>
        </div>

        {/* Footer / Controls */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Type</label>
              {/* This seems to be a date picker in the design  */}
              <div className="relative">
                <input type="text" readOnly value="Start date → End date" className="input-field w-64 pr-10" />
                <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Format</label>
              <select className="input-field">
                <option>Choose Format</option>
                <option>PDF</option>
                <option>CSV</option>
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateCustomReportModal;
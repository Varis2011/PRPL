// src/components/report/ReportFilled.jsx
import { FileText, Download } from 'lucide-react';

// Mock data for generated reports
const reports = [
  { id: 1, type: 'PDF', title: 'Quarter 1 2025/2026', date: '01/10/2026' }, // [cite: 311-313]
  { id: 2, type: 'PDF', title: 'Annual 2024/2025.pdf', date: '11/01/2025' }, // [cite: 313]
  { id: 3, type: 'CSV', title: 'Custom 12/01/24-01/01/25.csv', date: '11/01/2025' }, // [cite: 316-318]
];

const ReportFilled = ({ renderActionButtons }) => {
  return (
    <div>
      {/* Render the same action buttons from the parent */}
      {renderActionButtons()}
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Report</h2> 
        
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportItem key={report.id} report={report} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t text-sm text-gray-600">
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
    </div>
  );
};

const ReportItem = ({ report }) => {
  const isPDF = report.type === 'PDF';
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${isPDF ? 'bg-red-100' : 'bg-green-100'}`}>
          <FileText size={20} className={isPDF ? 'text-red-600' : 'text-green-600'} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{report.title}</h3>
          <p className="text-sm text-gray-500">{report.date}</p>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
        <Download size={16} />
        <span>Download</span> 
      </button>
    </div>
  );
};

export default ReportFilled;
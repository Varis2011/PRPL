// src/components/report/ReportGenerating.jsx
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

const ReportGenerating = ({ onComplete }) => {
  // Simulate report generation
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3-second delay
    
    return () => clearTimeout(timer); // Cleanup timer
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
        <Loader size={48} className="text-blue-600 animate-spin mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Generating Report...</h2> 
        <p className="text-gray-500 max-w-xs">Please wait, your report is being generated</p>
      </div>
    </div>
  );
};

export default ReportGenerating;
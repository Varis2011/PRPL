// src/pages/Report.jsx
import { useState } from 'react';
import ReportEmpty from '../components/report/ReportEmpty';
import ReportGenerating from '../components/report/ReportGenerating';
import ReportFilled from '../components/report/ReportFilled';
import { useApp } from '../context/AppContext';

// We need to override the modal in App.jsx.
// A simple way is to render it here *again* but with the correct props.
import GenerateCustomReportModal from '../components/modals/GenerateCustomReportModal';

const Report = () => {
  const [reportStatus, setReportStatus] = useState('empty');
  const { setIsGenerateReportModalOpen } = useApp();

  const handleGenerate = () => {
    setReportStatus('generating');
  };

  const handleOpenCustomModal = () => {
    setIsGenerateReportModalOpen(true);
  };
  
  const handleGenerationComplete = () => {
    setReportStatus('filled');
  };

  // Render the "action" buttons for empty and filled states
  const renderActionButtons = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <ActionCard
        title="Generate annual report"
        description="Generate this year report"
        onClick={handleGenerate}
      />
      <ActionCard
        title="Generate Quarter report"
        description="Generate selected quarter report"
        onClick={handleGenerate}
      />
      <ActionCard
        title="Generate Custom report"
        description="Generate custom time report"
        onClick={handleOpenCustomModal}
      />
    </div>
  );

  return (
    <>
      {/* This is a bit of a trick. We render the modal *here*
        so it has access to our page's `handleGenerate` function.
        The one in App.jsx will just be a fallback.
      */}
      <GenerateCustomReportModal onGenerate={handleGenerate} />
    
      {reportStatus === 'empty' && (
        <ReportEmpty onGenerateAnnual={handleGenerate} onGenerateQuarter={handleGenerate} onGenerateCustom={handleOpenCustomModal} />
      )}
      
      {reportStatus === 'generating' && (
        <ReportGenerating onComplete={handleGenerationComplete} />
      )}

      {reportStatus === 'filled' && (
        <ReportFilled renderActionButtons={renderActionButtons} />
      )}
    </>
  );
};

// Reusable action card
const ActionCard = ({ title, description, onClick }) => (
  <button onClick={onClick} className="bg-white p-6 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </button>
);

export default Report;
// src/components/report/ReportEmpty.jsx
const ReportEmpty = ({ onGenerateAnnual, onGenerateQuarter, onGenerateCustom }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ActionCard
          title="Generate annual report"
          description="Generate this year report"
          onClick={onGenerateAnnual}
        />
        <ActionCard
          title="Generate Quarter report"
          description="Generate selected quarter report"
          onClick={onGenerateQuarter}
        />
        <ActionCard
          title="Generate Custom report"
          description="Generate custom time report"
          onClick={onGenerateCustom}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Report Found!</h2> 
        <p className="text-gray-500">You haven't generated any report.</p>
      </div>
    </div>
  );
};

// Reusable action card
const ActionCard = ({ title, description, onClick }) => (
  <button onClick={onClick} className="bg-white p-6 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </button>
);

export default ReportEmpty;
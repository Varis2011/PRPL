// src/components/dashboard/BudgetChart.jsx
const BudgetChart = () => {
  const legendItems = [
    { name: 'Infrastructure', percent: '41,35%', color: 'bg-orange-400' },
    { name: 'Citizen', percent: '21,51%', color: 'bg-cyan-400' },
    { name: 'Administrative', percent: '13,47%', color: 'bg-blue-500' },
    { name: 'Social Program', percent: '9,97%', color: 'bg-green-500' },
    { name: 'Unexpected Expenses', percent: '3,35%', color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Budget Expense</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Chart Placeholder */}
        <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">Donut Chart Area</span>
        </div>
        
        {/* Legend */}
        <div className="flex-1 space-y-3">
          {legendItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-medium text-gray-800">{item.percent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;
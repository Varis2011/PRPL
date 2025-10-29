// src/components/dashboard/DashboardPageHeader.jsx
const DashboardPageHeader = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">
        Boolaksoomoor 2025/2026 Budget
      </h2>
      <div className="flex items-center gap-2">
        <FilterButton text="This month" />
        <FilterButton text="Last month" />
        <FilterButton text="This year" active />
      </div>
    </div>
  );
};

// Reusable filter button
const FilterButton = ({ text, active = false }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium
        ${
          active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {text}
    </button>
  );
};

export default DashboardPageHeader;
// src/components/common/StatCard.jsx
const StatCard = ({ title, amount, positive = false }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className={`text-3xl font-semibold 
        ${positive ? 'text-green-600' : 'text-gray-800'}
      `}>
        {amount}
      </p>
    </div>
  );
};

export default StatCard;
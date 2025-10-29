// src/pages/Dashboard.jsx
import { useState } from 'react';
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader';
import StatCard from '../components/common/StatCard';
import BudgetChart from '../components/dashboard/BudgetChart';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import EmptyState from '../components/common/EmptyState';

const Dashboard = () => {
  // We'll use this state to toggle between the filled and empty states
  const [hasBudget, setHasBudget] = useState(true);

  if (!hasBudget) {
    return (
      <EmptyState
        title="No Budget Found!"
        message="You haven't created any budget for this year"
        buttonText="Create new budget"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Page Header (Budget Title & Filters) */}
      <DashboardPageHeader />

      {/* 2. Overview Stat Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Available Fund" amount="Rp 100,000,000,000" />
          <StatCard title="Expense" amount="Rp 1,000,000,000" />
          <StatCard title="Income" amount="+ Rp 1,000,000,000" positive />
        </div>
      </div>

      {/* 3. Main Content Grid (Chart & Actions/Transactions)*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <BudgetChart />
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <QuickActions />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
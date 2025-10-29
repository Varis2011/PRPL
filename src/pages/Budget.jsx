// src/pages/Budget.jsx
import { useState } from 'react';
import EmptyState from '../components/common/EmptyState';
import BudgetCreationForm from '../components/budget/BudgetCreationForm';
import BudgetWaiting from '../components/budget/BudgetWaiting';
import BudgetFilled from '../components/budget/BudgetFilled';

const Budget = () => {
  // We can set the default state, e.g., 'empty', 'creating', 'waiting', 'filled'
  const [budgetStatus, setBudgetStatus] = useState('empty');

  // Handlers to change the state
  const handleCreateNew = () => setBudgetStatus('creating');
  const handleAskForApproval = () => setBudgetStatus('waiting');
  // In a real app, other handlers would set it to 'filled' or 'empty'
  const handleGoBack = () => setBudgetStatus('empty'); 

  switch (budgetStatus) {
    case 'creating':
      return <BudgetCreationForm onSubmit={handleAskForApproval} onBack={handleGoBack} />;
    case 'waiting':
      return <BudgetWaiting />;
    case 'filled':
      return <BudgetFilled />;
    case 'empty':
    default:
      return (
        <EmptyState
          title="No Budget Found!"
          message="You haven't created any budget for this year"
          buttonText="Create new budget"
          onButtonClick={handleCreateNew}
        />
      );
  }
};

export default Budget;
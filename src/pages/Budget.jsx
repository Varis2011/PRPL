// src/pages/Budget.jsx
import { useEffect, useState } from 'react';
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from '../services/budgetService';
import EmptyState from '../components/common/EmptyState';
import BudgetCreationForm from '../components/budget/BudgetCreationForm';
import BudgetFilled from '../components/budget/BudgetFilled';
import BudgetWaiting from '../components/budget/BudgetWaiting';
import { useNavigate } from 'react-router-dom';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [status, setStatus] = useState('loading');
  const [editingBudget, setEditingBudget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadBudgets();
  }, []);

  async function loadBudgets() {
    const data = await getBudgets();
    setBudgets(data);
    setStatus(data.length ? 'filled' : 'empty');
  }

  // Create new budget
  const handleCreate = async (formData) => {
    const newBudget = await createBudget(formData);
    setBudgets([...budgets, newBudget]);
    setStatus('waiting');
  };

  // Edit or update budget
  const handleUpdate = async (id, updates) => {
    const updated = await updateBudget(id, updates);
    setBudgets(budgets.map((b) => (b.id === id ? updated : b)));
    setStatus('waiting');
  };

  // Delete budget
  const handleDelete = async (id) => {
    await deleteBudget(id);
    setBudgets(budgets.filter((b) => b.id !== id));
    if (budgets.length - 1 === 0) setStatus('empty');
  };

  // UI switching
  if (status === 'loading') return <p>Loading budgets...</p>;

  if (status === 'empty') {
    return (
      <EmptyState
        title="No Budget Found!"
        message="You haven't created any budget for this year."
        buttonText="Create new budget"
        onButtonClick={() => setStatus('creating')}
      />
    );
  }

  if (status === 'creating' || editingBudget) {
    return (
      <BudgetCreationForm
        initialData={editingBudget}
        onSubmit={async (formData) => {
          if (editingBudget) {
            await handleUpdate(editingBudget.id, formData);
            setEditingBudget(null);
          } else {
            await handleCreate(formData);
          }
        }}
        onBack={() => {
          setEditingBudget(null);
          setStatus('filled');
        }}
      />
    );
  }

  if (status === 'waiting') {
    return (
      <BudgetWaiting
        budgets={budgets}
        onApprove={(id) => handleUpdate(id, { status: 'approved' })}
        onReject={(id) => handleUpdate(id, { status: 'rejected' })}
      />
    );
  }

  if (status === 'filled') {
    return (
      <BudgetFilled
        budgets={budgets}
        onEdit={(budget) => setEditingBudget(budget)}
        onDelete={handleDelete}
      />
    );
  }

  return null;
};

export default Budget;

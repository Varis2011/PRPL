import { X, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { createTransaction } from '../../services/transactionService';

const AddTransactionModal = ({ onAdded }) => {
  const { isAddTransactionModalOpen, setIsAddTransactionModalOpen } = useApp();

  const [form, setForm] = useState({
    type: 'expense',
    title: '',
    category: '',
    amount: '',
    date: '',
    description: '',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, attachment: file ? file.name : null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = await createTransaction(form);
      if (onAdded) onAdded(newTransaction); // Refresh parent table
      setIsAddTransactionModalOpen(false);
      setForm({ type: 'expense', title: '', category: '', amount: '', date: '', description: '', attachment: null });
    } catch (error) {
      console.error('❌ Failed to create transaction:', error);
    }
  };

  if (!isAddTransactionModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <button onClick={() => setIsAddTransactionModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Type">
            <div className="flex gap-4">
              <RadioToggle
                id="expense"
                name="type"
                label="Expense"
                value="expense"
                checked={form.type === 'expense'}
                onChange={handleChange}
              />
              
              <RadioToggle
                id="income"
                name="type"
                label="Income"
                value="income"
                checked={form.type === 'income'}
                onChange={handleChange}
              />

            </div>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title">
              <input
                name="title"
                type="text"
                placeholder="Transaction name"
                className="input-field"
                value={form.title}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField label="Date">
              <input
                name="date"
                type="date"
                className="input-field"
                value={form.date}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Category">
              <select
                name="category"
                className="input-field"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Choose category</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Citizen">Citizen</option>
              </select>
            </FormField>
            <FormField label="Amount">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                <input
                  name="amount"
                  type="number"
                  placeholder="10000000"
                  className="input-field pl-8"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </FormField>
          </div>

          <FormField label="Attachment">
            <label htmlFor="file-upload" className="input-field flex items-center gap-2 text-gray-500 cursor-pointer">
              <Paperclip size={16} />
              <span>Choose File</span>
              <span className="text-gray-400 ml-auto">
                {form.attachment || 'No file chosen'}
              </span>
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
          </FormField>

          <FormField label="Description">
            <textarea
              name="description"
              placeholder="Description of transaction"
              rows="3"
              className="input-field"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </FormField>

          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Add transaction
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper components
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const RadioToggle = ({ id, name, label, checked, onChange, value }) => (
  <div className="flex-1">
    <input
      type="radio"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <label
      htmlFor={id}
      onClick={() => onChange({ target: { name, value } })} // ✅ Force value change manually
      className={`block w-full py-3 text-center border rounded-lg cursor-pointer font-medium transition-colors
        ${checked ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}
      `}
    >
      {label}
    </label>
  </div>
);


export default AddTransactionModal;
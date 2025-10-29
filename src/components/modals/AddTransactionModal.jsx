// src/components/modals/AddTransactionModal.jsx
import { X, Paperclip } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AddTransactionModal = () => {
  const { isAddTransactionModalOpen, setIsAddTransactionModalOpen } = useApp();

  if (!isAddTransactionModalOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <button onClick={() => setIsAddTransactionModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Available Fund */}
        <p className="text-sm text-gray-500 mb-6">
          Available fund <span className="font-semibold text-blue-600">Rp 100,000,000,000</span>
        </p>

        {/* Form */}
        <form className="space-y-4">
          <FormField label="Type">
            <div className="flex gap-4">
              <RadioToggle id="expense" name="type" label="Expense" defaultChecked />
              <RadioToggle id="income" name="type" label="Income" />
            </div>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title">
              <input type="text" placeholder="Transaction name" className="input-field" />
            </FormField>
            <FormField label="Date">
              <input type="date" className="input-field" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Category">
              <select className="input-field">
                <option value="">Choose category</option>
                <option value="infra">Infrastructure</option>
                <option value="citizen">Citizen</option>
                {/* Add other categories */}
              </select>
            </FormField>
            <FormField label="Amount">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                <input type="text" placeholder="10,000,000" className="input-field pl-8" />
              </div>
            </FormField>
          </div>
          
          <FormField label="Attachment">
            <label htmlFor="file-upload" className="input-field flex items-center gap-2 text-gray-500 cursor-pointer">
              <Paperclip size={16} />
              <span>Choose File</span>
              <span className="text-gray-400 ml-auto">No file chosen</span>
            </label>
            <input id="file-upload" type="file" className="hidden" />
          </FormField>

          <FormField label="Description">
            <textarea placeholder="Description of transaction" rows="3" className="input-field"></textarea>
          </FormField>

          {/* Submit Button */}
          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Add transaction
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper component for form fields
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

// Helper component for radio buttons 
const RadioToggle = ({ id, name, label, defaultChecked = false }) => (
  <div className="flex-1">
    <input type="radio" name={name} id={id} className="peer hidden" defaultChecked={defaultChecked} />
    <label
      htmlFor={id}
      className="block w-full py-3 text-center border rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 font-medium"
    >
      {label}
    </label>
  </div>
);

export default AddTransactionModal;
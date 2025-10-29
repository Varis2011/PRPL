// src/context/AppContext.jsx
import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AppContext = createContext();

// 2. Create a "Provider" component
export const AppProvider = ({ children }) => {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);

  const value = {
    isAddTransactionModalOpen,
    setIsAddTransactionModalOpen,
    isGenerateReportModalOpen,
    setIsGenerateReportModalOpen,
    // We can add more global state here later (e.g., user info)
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Create a custom "hook" to easily use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
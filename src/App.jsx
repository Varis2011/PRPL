// src/App.jsx (Updated)
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import BudgetApproval from './pages/BudgetApproval';
import Transactions from './pages/Transactions';
import Report from './pages/Report'; // Import the new Report page
import AddTransactionModal from './components/modals/AddTransactionModal';
import GenerateCustomReportModal from './components/modals/GenerateCustomReportModal'; // Import new modal
import { useApp } from './context/AppContext'; // Import useApp to pass props

function App() {
  // We need to pass the page's setReportStatus to the modal
  // This is a bit advanced, so we'll pass a placeholder for now
  // A better way would be to move reportStatus to context, but this works
  
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route path="/" element={<><Header title="Dashboard" /><Dashboard /></>} />
          <Route path="/budget" element={<><Header title="Budget" /><Budget /></>} />
          <Route path="/transactions" element={<><Header title="Transaction" /><Transactions /></>} />
          <Route path="/report" element={<><Header title="Report" /><Report /></>} />
          <Route path="/budget/approval" element={<BudgetApproval />} />
        </Routes>
      </main>
      
      <AddTransactionModal />
      {/* We'll pass a placeholder function to onGenerate */}
      <GenerateCustomReportModal onGenerate={() => console.log('Generate clicked!')} />
    </div>
  )
}

export default App;
// // src/App.jsx (Updated)
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './components/layout/Sidebar';
// import Header from './components/layout/Header';
// import Dashboard from './pages/Dashboard';
// import Budget from './pages/Budget';
// // Import the Transactions page (we'll create this next)
// import Transactions from './pages/Transactions'; 
// import AddTransactionModal from './components/modals/AddTransactionModal'; // Import the modal

// const Report = () => <div className="text-3xl font-bold">Report Page</div>;

// function App() {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8 overflow-auto">
//         <Routes>
//           <Route path="/" element={<><Header title="Dashboard" /><Dashboard /></>} />
//           <Route path="/budget" element={<><Header title="Budget" /><Budget /></>} />
//           <Route path="/transactions" element={<><Header title="Transaction" /><Transactions /></>} />
//           <Route path="/report" element={<><Header title="Report" /><Report /></>} />
//         </Routes>
//       </main>
      
//       {/* The modal lives here, outside the routes, so it can overlay anything */}
//       <AddTransactionModal />
//     </div>
//   )
// }

// export default App

// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, Receipt, FileText, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Boolaksoomoor</h1>
        <span className="text-sm text-gray-500">Finance</span>
      </div>

      {/* Main Menu */}
      <nav className="flex-grow">
        <h2 className="text-xs text-gray-400 uppercase mb-2">Menu</h2>
        <ul>
          <li><SidebarLink icon={<LayoutDashboard size={20} />} to="/">Dashboard</SidebarLink></li>
          <li><SidebarLink icon={<Wallet size={20} />} to="/budget">Budget</SidebarLink></li>
          <li><SidebarLink icon={<Receipt size={20} />} to="/transactions">Transaction</SidebarLink></li>
         
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="mt-auto">
        <nav>
          <ul>
            <li><SidebarLink icon={<Settings size={20} />} to="/settings">Settings & Account</SidebarLink></li>
            <li><SidebarLink icon={<HelpCircle size={20} />} to="/help">Help</SidebarLink></li>
            <li><SidebarLink icon={<LogOut size={20} />} to="/logout">Log Out</SidebarLink></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

// Helper component for links
const SidebarLink = ({ icon, to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors ${
          isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

export default Sidebar;
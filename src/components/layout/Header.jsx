// src/components/layout/Header.jsx
import { Search, Bell, User } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="flex items-center justify-between mb-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Icons & User Avatar */}
        <div className="flex items-center gap-4">
          <Bell size={24} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
            A {/* This matches the "A" avatar in the design */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
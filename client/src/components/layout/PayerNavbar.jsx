import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

const PayerNavbar = ({ toggleSidebar, toggleTheme, theme }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 font-semibold text-xl">Payer Dashboard</div>
          </div>
          <div className="flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PayerNavbar;
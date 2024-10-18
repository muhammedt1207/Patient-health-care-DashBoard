import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '',
  onKeyDown,
  autoFocus = false,
}) => {
  const { theme } = useTheme();

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon 
          className={`h-5 w-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} 
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        className={`
          block w-full pl-10 pr-3 py-2 rounded-lg
          ${theme === 'dark' 
            ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
            : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'}
          border focus:ring-1 focus:ring-blue-500 focus:outline-none
          placeholder:${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
          ${className}
        `}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
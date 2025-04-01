"use client";
import React from 'react';
import FilterDropdown from './FilterDropdown';
import SearchInput from './SearchInput';
import NotificationButton from './NotificationButton';
import LogoutButton from './LogoutButton';


function Header() {
    return (
      <header className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center"> {/* Nền trắng, border nhạt hơn */}
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-800">List</span> {/* Chữ "List" đậm hơn */}
          <FilterDropdown />
          <SearchInput />
        </div>
        <div className="flex items-center space-x-4">
          <NotificationButton />
          <LogoutButton />
        </div>
      </header>
    );
  }

export default Header;
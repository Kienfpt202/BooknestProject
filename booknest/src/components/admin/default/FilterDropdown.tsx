"use client";
import React from 'react';


function FilterDropdown() {
    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          Add filter
          <svg className="-mr-1 ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {/* Thêm menu bộ lọc nếu cần */}
      </div>
    );
  }

export default FilterDropdown;
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'; // Ví dụ sử dụng Heroicons

function SearchInput() {
    return (
      <div className="relative rounded"> {/* Bỏ shadow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search for user by name or id"
        />
      </div>
    );
  }

export default SearchInput;
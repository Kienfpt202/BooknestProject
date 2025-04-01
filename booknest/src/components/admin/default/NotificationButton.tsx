"use client";
import { BellIcon } from 'lucide-react';
import React from 'react';

function NotificationButton() {
  return (
    <button className="relative rounded-full p-2 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> {/* Nền trắng */}
      <BellIcon className="h-5 w-5" aria-hidden="true" />
      {/* Thêm badge nếu cần */}
    </button>
  );
}

export default NotificationButton;
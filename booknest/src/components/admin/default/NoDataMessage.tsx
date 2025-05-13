"use client";
import React from 'react';

function NoDataMessage() {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative">
          <svg viewBox="0 0 100 70" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="w-24 h-24 text-gray-400">
            <path d="M20 50 C 20 40, 40 40, 40 50" fill="currentColor" />
            <path d="M80 50 C 80 40, 60 40, 60 50" fill="currentColor" />
            <path d="M30 30 L 70 30 Q 80 35, 75 45 L 25 45 Q 20 35, 30 30" fill="currentColor" />
            <path d="M35 25 C 35 20, 40 20, 40 25" fill="lightgray" /> {/* Chỉnh màu tai */}
            <path d="M65 25 C 65 20, 60 20, 60 25" fill="lightgray" /> {/* Chỉnh màu tai */}
            <text x="45" y="20" fontSize="10" fill="black">Z</text> {/* Chỉnh màu chữ Z */}
            <text x="50" y="25" fontSize="10" fill="black">Z</text> {/* Chỉnh màu chữ Z */}
            <text x="55" y="30" fontSize="10" fill="black">Z</text> {/* Chỉnh màu chữ Z */}
          </svg>
        </div>
        <div className="text-lg font-medium text-gray-600 mt-4">No data at this time</div> {/* Chữ đậm vừa */}
        <div className="text-sm text-gray-500 mt-1">data will appear here after added in the system</div>
      </div>
    );
  }

export default NoDataMessage;
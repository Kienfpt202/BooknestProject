"use client";
import React from 'react';

interface MenuItemProps {
    icon: string;
    label: string;
    active?: boolean;
  }
  
  function MenuItem({ icon, label, active }: MenuItemProps) {
    const className = `flex items-center py-2 px-4 rounded-md hover:bg-[#5D4037] transition-colors duration-200 ${
      active ? 'bg-[#D7CCC8] text-[#3E2723] font-semibold' : '' /* Màu active nhạt hơn và chữ nâu */
    }`;
    return (
      <div className={className}>
        <span className={`mr-3 ${icon}`}></span> {/* Tăng khoảng cách icon và text */}
        <span>{label}</span>
      </div>
    );
  }
  

export default MenuItem;
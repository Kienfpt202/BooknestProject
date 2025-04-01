"use client";
import React from 'react';
import MenuItem from './MenuItem';

function Sidebar() {
    return (
      <aside className="bg-[#3E2723] text-white w-64 flex flex-col"> {/* Màu nâu đậm */}
        <div className="p-4 flex items-center justify-center">
          {/* Thay thế bằng logo thực tế */}
          <div className="font-bold text-xl">BookShelf</div> {/* Placeholder logo text */}
        </div>
        <nav className="flex-1 p-4 space-y-1"> {/* Giảm khoảng cách giữa các item */}
          <MenuItem icon="home" label="Dashboard" active={true} />
          <MenuItem icon="users" label="Users" />
          <MenuItem icon="book" label="Books" />
          <MenuItem icon="club" label="Clubs" />
          <MenuItem icon="review" label="Reviews" />
          <MenuItem icon="discussion" label="Discussions" />
        </nav>
      </aside>
    );
  }

export default Sidebar;
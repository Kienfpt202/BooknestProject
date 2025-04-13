"use client";

import { useState } from "react";
import Sidebar from "@components/user/dashboard/Sidebar"; // Import Sidebar
import Navbar from "@components/user/dashboard/Navbar"; // Import Navbar
import MainContent from "@components/user/book/MainContent";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar (Fixed on the left) */}
      <div
        className={`w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)] transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content (Offset by sidebar) */}
      <div className="flex-1 ml-64">
        {/* Navbar (Fixed at the top) */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-[#F5F1EB] shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-[#8B5E3B]"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>

        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
"use client";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import MainContent from "@components/user/book/MainContent";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#fefaf2] font-sans text-[#5a3b2e]">
      {/* Sidebar cố định bên trái */}
      <div className="w-64 bg-[#f8f1e7] border-r border-[#d2bfa3] fixed left-0 top-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar cố định trên cùng */}
        <div className="h-[70px] bg-[#fefaf2] border-b border-[#e0c197] shadow-sm flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Nội dung chính */}
        <main className="flex-1 overflow-y-auto p-8">

          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

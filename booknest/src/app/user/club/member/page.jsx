// app/(user)/club/members/page.jsx hoặc pages/club/members.jsx
"use client";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ClubMembers from "@components/user/club/ClubMembers";

export default function ClubMembersPage() {
  const clubName = "BookNest Club"; // đặt cứng tên CLB để hiển thị UI

  return (
    <div className="flex bg-[#E7E6E3] min-h-screen">
      {/* Sidebar (Cố định bên trái) */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      {/* Main content (Dịch phải tránh sidebar) */}
      <div className="flex-1 ml-64">
        {/* Navbar (Cố định trên cùng) */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Nội dung chính */}
        <div className="pt-20 px-6 h-[calc(100vh-70px)] overflow-auto">
          <h1 className="text-2xl font-bold text-[#5b3b1c] mb-4">{clubName}</h1>
          <ClubMembers clubName={clubName} />
        </div>
      </div>
    </div>
  );
}

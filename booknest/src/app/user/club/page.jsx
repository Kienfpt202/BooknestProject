
"use client";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ClubSection from "@components/user/club/ClubSection";

const ClubPage = () => {
  // Dữ liệu giả để hiển thị
  const joinedClubs = [
    { name: "Club name", owner: "Owner name", time: "30/06/2025, 8:30 AM", status: "enrolled" },
    { name: "Club name", owner: "Owner name", time: "30/06/2025, 8:30 AM", status: "not-confirmed" },
  ];

  const myClubs = [
    { name: "Club name", owner: "Owner name", time: "30/06/2025, 8:30 AM" },
    { name: "Club name", owner: "Owner name", time: "30/06/2025, 8:30 AM" },
  ];

  return (
    <div className="flex bg-gray-100">
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

        {/* Nội dung chính (Thêm padding-top để tránh bị Navbar che) */}
        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen">
          {/* Phần Joined Clubs */}
          <ClubSection title="Joined clubs" clubs={joinedClubs} />

          {/* Phần My Clubs */}
          <ClubSection title="My Clubs" clubs={myClubs} isMyClub showCreateButton />
        </div>
      </div>
    </div>
  );
};

export default ClubPage;
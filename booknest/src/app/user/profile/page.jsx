"use client";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import GenreRead from "@components/user/profile/GenreRead";
import ReadingProgress from "@components/user/profile/ReadingProgress";
import FollowersRead from "@components/user/profile/FollowersRead";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar (Cố định bên trái) */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      {/* Main content (Dịch phải để tránh Sidebar) */}
      <div className="flex-1 ml-64">
        {/* Navbar (Cố định trên cùng) */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Nội dung chính */}
        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen flex flex-col">
          {/* Hàng đầu tiên: Genre Read & Reading Progress */}
          <div className="flex gap-6">
            <div className="w-2/3">
              <GenreRead />
            </div>
            <div className="w-1/3">
              <ReadingProgress />
            </div>
          </div>

          {/* Hàng thứ hai: Followers Read (chiếm toàn bộ chiều rộng) */}
          <div className="w-full">
            <FollowersRead />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

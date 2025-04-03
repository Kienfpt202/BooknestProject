"use client";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import { JoinedClubsSection, MyClubsSection } from "@components/user/club/ClubSections";

const ClubsPage = () => {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar cố định */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar activeTab="club" />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Navbar cố định */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Nội dung chính */}
        <div className="pt-20 px-6 min-h-screen">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">BookNest Clubs</h1>
            </div>

            {/* Grid layout */}
            <div className="grid gap-8">
              {/* Joined Clubs Section */}
              <JoinedClubsSection />

              {/* My Clubs Section */}
              <MyClubsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
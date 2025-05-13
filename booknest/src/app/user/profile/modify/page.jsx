"use client";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ProfileHeader from "@components/user/profile/edit-profile/ProfileHeader";
import PersonalInfoForm from "@components/user/profile/edit-profile/PersonalInfoForm";

export default function ProfilePage() {
  return (
    <div className="flex bg-[#f5f6f8] min-h-screen">
      {/* Sidebar bên trái */}
      <aside className="w-[240px] bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Main content layout */}
      <main className="flex-1 flex flex-col">
        {/* Navbar cố định trên cùng */}
        <header className="h-16">
          <Navbar />
        </header>

        {/* Nội dung chính nằm dưới navbar */}
        <section className="p-6 space-y-8">
          {/* Header hiển thị thông tin người dùng */}
          <ProfileHeader />

          {/* Form chỉnh sửa thông tin cá nhân */}
          <PersonalInfoForm />
        </section>
      </main>
    </div>
  );
}

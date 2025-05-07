"use client";
import React from 'react';
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ProfileHeader from '@components/user/profile/edit-profile/ProfileHeader';
import ReviewCard from '@components/user/profile/review/ReviewCard';
import { useAuth } from '@context/usercontext'; // Dùng hook này thay cho useUserContext

export default function ProfilePage() {
  const { currentUser } = useAuth(); // Lấy thông tin user

  // Kiểm tra nếu chưa có user (đang loading hoặc chưa login)
  if (!currentUser) return <div>Loading...</div>;

  // Dữ liệu review tạm thời, có thể thay bằng Firestore sau
  const reviews = [
    {
      name: currentUser.name,
      avatar: currentUser.avatar || '/default-avatar.png',
      time: '22 hours ago',
      content: 'My thoughts after reading the book How to Win Friends and Influence People by Dale Carnegie...',
      likes: 63,
      comments: 63,
    },
    {
      name: currentUser.name,
      avatar: currentUser.avatar || '/default-avatar.png',
      time: '22 hours ago',
      content: 'My thoughts after reading Harry Potter by J. K. Rowling...',
      likes: 63,
      comments: 63,
    },
  ];

  return (
    <div className="flex bg-[#f5f6f8] min-h-screen">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Main layout */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16">
          <Navbar />
        </header>

        {/* Content */}
        <section className="p-6 space-y-8">
          {/* Header: Profile Info */}
          <ProfileHeader
            name={currentUser.name}
            avatarUrl={currentUser.avatar || '/default-avatar.png'} // Đảm bảo giá trị hợp lệ
            currentUserName={currentUser.name} // Truyền tên người dùng hiện tại vào ProfileHeader
          />

          {/* Book Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-[#5b3b1c] mb-4">Your book reviews:</h3>
            <div className="space-y-6">
              {reviews.map((r, idx) => (
                <ReviewCard key={idx} {...r} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

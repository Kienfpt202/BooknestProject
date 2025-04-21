import React from 'react';
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ProfileHeader from '@components/user/home/follower_profile/ProfileHeader';
import ReviewCard from '@components/user/profile/review/ReviewCard';

const reviews = [
    {
      name: 'Nguyen Chi Kien',
      avatar: '/user-avatar.png',
      time: '22 hours ago',
      content: 'My thoughts after reading the book How to Win Friends and Influence People by Dale Carnegie as follows...',
      likes: 63,
      comments: 63,
    },
    {
      name: 'Nguyen Chi Kien',
      avatar: '/user-avatar.png',
      time: '22 hours ago',
      content: 'My thoughts after reading the Harry Potter by J. K. Rowling as follows...',
      likes: 63,
      comments: 63,
    },
  ];
  
  export default function ProfilePage() {
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
            <ProfileHeader name="Nguyen Chi Kien" avatarUrl="/user-avatar.png" />
  
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
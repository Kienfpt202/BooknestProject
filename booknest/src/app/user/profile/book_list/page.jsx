"use client";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import BookList from "@components/user/profile/book-list/BookSection";
import ProfileHeader from '@components/user/profile/edit-profile/ProfileHeader';

const booksData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/covers/gatsby.jpg",
    views: 1200,
    date: "12 Mar 2025",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/covers/mockingbird.jpg",
    views: 980,
    date: "08 Mar 2025",
  },
  {
    title: "1984",
    author: "George Orwell",
    cover: "/covers/1984.jpg",
    views: 1500,
    date: "01 Mar 2025",
  },
];

const Dashboard = () => {
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
          {/* Header: Profile Info */}
          <ProfileHeader name="Nguyen Chi Kien" avatarUrl="/user-avatar.png" />

          {/* Title for book lists */}
          <h1 className="text-2xl font-bold text-[#8B5E3B] mb-6">Your current lists:</h1>

          {/* Book lists layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BookList title="Reading Books" books={booksData} />
            <BookList title="Finished Reading Books" books={booksData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

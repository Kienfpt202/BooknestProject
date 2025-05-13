"use client";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import BookList from "@components/user/book/BookList";

const booksData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/images/the_great_gastby.jpg",
    views: 1200,
    date: "12 Mar 2025",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/images/to_kill a_mockingbird.jpg",
    views: 980,
    date: "08 Mar 2025",
  },
  {
    title: "1984",
    author: "George Orwell",
    cover: "/images/1984.jpg",
    views: 1500,
    date: "01 Mar 2025",
  },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <Navbar />

        <main className="p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold text-[#8B5E3B] mb-6">
            Welcome to BookNest Community!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BookList title="Latest Books" books={booksData} />
            <BookList title="Popular Books" books={booksData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

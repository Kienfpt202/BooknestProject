"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import BookList from "@components/user/book/BookList";

const BookPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const querySnapshot = await getDocs(booksCollection);
      const booksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex h-screen bg-[#fefaf2] font-sans text-[#5a3b2e]">
      <div className="w-64 bg-[#f8f1e7] border-r border-[#d2bfa3] fixed left-0 top-0 h-screen z-50">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <div className="h-[70px] bg-[#fefaf2] border-b border-[#e0c197] shadow-sm flex items-center px-6 z-50">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="w-full md:w-3/4">
            <h2 className="text-xl font-semibold mb-4 text-[#8B5E3B]">All Books</h2>
            <BookList books={books} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookPage;

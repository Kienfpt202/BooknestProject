"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import BookDetails from "@components/user/book/BookDetails";
import Pagination from "@components/user/book/Pagination";
import ActionButtons from "@components/user/book/ActionButtons";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook(docSnap.data());
        } else {
          console.log("No such book!");
        }
      } catch (error) {
        console.error("Failed to fetch book: ", error);
      }
    };

    if (bookId) fetchBook();
  }, [bookId]);

  if (!book) return <div className="p-8 text-center">Loading...</div>;

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
            <h2 className="text-xl font-semibold mb-4 text-[#8B5E3B]">Book Details</h2>
            <div className="space-y-4">
              <BookDetails
                title={book.title}
                author={book.author}
                genre={book.genre}
                publicationYear={book.publication_year}
                currentPage={currentPage}
                totalPages={book.page_count || 100}
                onPageChange={setCurrentPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={book.page_count || 100}
                onPageChange={setCurrentPage}
              />
              <ActionButtons />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookDetailPage;

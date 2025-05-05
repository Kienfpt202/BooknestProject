"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import BookTable from "@components/admin/book/BookTable";
import Pagination from "@components/admin/Pagination";
import NoDataMessage from "@components/admin/default/NoDataMessage";
import Link from "next/link";

const itemsPerPage = 6;

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const bookList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "No title",
          author: data.author || "Unknown",
          cover_image_url: data.cover_image_url || "",
          genre: data.genre || "Unknown",
          publication_year: data.publication_year || "N/A",
        };
      });
      setBooks(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteDoc(doc(db, "books", id));
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const totalItems = books.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#F5F5F5] p-6">
        <Navbar />
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Book Management</h2>
            <Link href="/admin/book/create">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Create New Book</button>
            </Link>
          </div>

          {books.length === 0 ? (
            <NoDataMessage />
          ) : (
            <>
              <BookTable books={currentBooks} onDelete={handleDelete} />
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;

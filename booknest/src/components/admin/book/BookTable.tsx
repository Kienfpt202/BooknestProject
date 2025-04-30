// BookTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import BookRow from "./BookRow";
import { db } from "@lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import Firestore functions

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  publication_year: number;
  cover_image_url: string;
}

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []); // Run once when component mounts

  const handleDelete = async (id: string) => {
    try {
      const bookRef = doc(db, "books", id);
      await deleteDoc(bookRef);
      setBooks(books.filter((book) => book.id !== id)); // Remove deleted book from state
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality here, maybe navigate to an edit page
    console.log("Edit book with id:", id);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F5F5F5]">
          <tr>
            {["Title", "Author", "Genre", "Publication Year", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4 text-black">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BookRow
              key={book.id}
              id={book.id}
              title={book.title} // Mapping title to name
              author={book.author} // Mapping author to owner
              genre={book.genre.join(", ")} // Joining genres into a string
              publication_year={book.publication_year} // Mapping publication year
              index={index}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;

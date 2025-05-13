"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";
import BookRow from "./BookRow";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[] | string;
  cover_image_url: string;
}

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData: Book[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "No title",
          author: data.author || "No author",
          genre: Array.isArray(data.genre)
            ? data.genre
            : typeof data.genre === "string"
            ? [data.genre]
            : [],
          cover_image_url: data.cover_image_url || "",
        };
      });
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteDoc(doc(db, "books", id));
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (id: string) => {
    // TODO: Add edit logic or navigation
    console.log("Edit book:", id);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Title", "Author", "Genre", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookRow
              key={book.id}
              title={book.title}
              author={book.author}
              genre={Array.isArray(book.genre) ? book.genre.join(", ") : book.genre}
              onDelete={() => handleDelete(book.id)}
              onEdit={() => handleEdit(book.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;

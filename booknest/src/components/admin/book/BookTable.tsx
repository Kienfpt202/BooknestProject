"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";
import BookRow from "./BookRow";

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
          genre: data.genre || [],
          publication_year: data.publication_year || 0,
          cover_image_url: data.cover_image_url || "",
        };
      });
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "books", id));
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (id: string) => {
    // TODO: implement actual navigation/edit logic
    console.log("Edit book with id:", id);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Title", "Author", "Genre", "Publication Year", "Operation"].map((col) => (
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
              genre={book.genre.join(", ")}
              publication_year={book.publication_year}
              onDelete={() => handleDelete(book.id)}
              onEdit={() => handleEdit(book.id)} id={""}            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;

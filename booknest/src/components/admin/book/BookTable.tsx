"use client";
import React from "react";
import BookRow from "./BookRow";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[] | string;
  cover_image_url: string;
}

interface BookTableProps {
  books: Book[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void; // optional
}

const BookTable: React.FC<BookTableProps> = ({ books, onDelete, onEdit }) => {
  const handleEdit = (id: string) => {
    if (onEdit) onEdit(id);
    else console.log("Edit book:", id);
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
              onDelete={() => onDelete(book.id)}
              onEdit={() => handleEdit(book.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;

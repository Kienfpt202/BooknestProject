"use client";

import { useState, useMemo } from "react";
import BookCard from "./BookCard";

interface BookListProps {
  title: string;
  books: {
    bookId: string;
    title: string;
    author: string;
    cover: string;
    views: number;
    date: string;
    description: string;
    genre: string;
    pageCount: number;
    publisher: string;
  }[];
}

const BookList = ({ title, books }: BookListProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  // Lấy danh sách tác giả duy nhất
  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(books.map((b) => b.author)));
    return ["All", ...uniqueAuthors];
  }, [books]);

  // Lọc sách theo tác giả
  const filteredBooks = useMemo(() => {
    return selectedAuthor === "All"
      ? books
      : books.filter((book) => book.author === selectedAuthor);
  }, [books, selectedAuthor]);

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold text-[#8B5E3B] mb-4">{title}</h2>

      {/* Filter theo tác giả */}
      <div className="mb-4">
        <label className="mr-2 text-[#8B5E3B] font-medium">Filter by author:</label>
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị danh sách sách */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {filteredBooks.map((book, index) => (
          <BookCard id={""} coverImage={""} key={index} {...book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;

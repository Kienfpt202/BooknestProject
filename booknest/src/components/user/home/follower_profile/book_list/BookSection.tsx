// components/BookSection.tsx
import React from "react";
import BookCard from "./BookCard";

interface Book {
  title: string;
  author: string;
  date: string;
  coverUrl?: string;
}

interface BookSectionProps {
  label: string;
  books: Book[];
}

const BookSection: React.FC<BookSectionProps> = ({ label, books }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#6a3d0f] mb-3">{label}</h3>
      <div className="flex flex-wrap gap-4">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookSection;

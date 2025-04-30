// BookRow.tsx
import React from "react";

interface BookRowProps {
  id: string;
  title: string; // Sử dụng title thay cho name
  author: string; // Sử dụng author thay cho owner
  genre: string; // Genre sẽ được hiển thị dưới dạng chuỗi
  publication_year: number; // Publication year
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const BookRow: React.FC<BookRowProps> = ({
  id,
  title,
  author,
  genre,
  publication_year,
  index,
  onDelete,
  onEdit,
}) => {
  return (
    <tr className={`border-t ${index % 2 === 0 ? "bg-[#E6F0FA]" : "bg-white"}`}>
      <td className="py-3 px-4 text-black">{title}</td> {/* Hiển thị title */}
      <td className="py-3 px-4 text-black">{author}</td> {/* Hiển thị author */}
      <td className="py-3 px-4 text-black">{genre}</td> {/* Hiển thị genre */}
      <td className="py-3 px-4 text-black">{publication_year}</td> {/* Hiển thị publication year */}
      <td className="py-3 px-4 flex gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => onEdit(id)}
        >
          ✏️
        </button>
        <button
          className="bg-[#FF6F61] text-white px-2 py-1 rounded"
          onClick={() => onDelete(id)}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default BookRow;

import React from "react";

interface BookRowProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  publication_year: number;
  onDelete: () => void;
  onEdit: () => void;
}

const BookRow: React.FC<BookRowProps> = ({
  title,
  author,
  genre,
  publication_year,
  onDelete,
  onEdit,
}) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{title}</td>
      <td className="py-3 px-4">{author}</td>
      <td className="py-3 px-4">{genre}</td>
      <td className="py-3 px-4">{publication_year}</td>
      <td className="py-3 px-4 flex gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          onClick={onEdit}
        >
          ✏️
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
          onClick={onDelete}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default BookRow;

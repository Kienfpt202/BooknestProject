import React from "react";

interface BookRowProps {
  title: string;
  author: string;
  genre: string;
  onDelete: () => void;
  onEdit: () => void;
}

const BookRow: React.FC<BookRowProps> = ({
  title,
  author,
  genre,
  onDelete,
}) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{title}</td>
      <td className="py-3 px-4">{author}</td>
      <td className="py-3 px-4">{genre}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            onClick={onDelete}
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookRow;

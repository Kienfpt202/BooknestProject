import React from "react";

interface BookRowProps {
  name: string;
  owner: string;
  scope: string;
  desc: string;
  index: number; // Add index to alternate row colors
}

const BookRow: React.FC<BookRowProps> = ({ name, owner, scope, desc, index }) => {
  return (
    <tr className={`border-t ${index % 2 === 0 ? "bg-[#E6F0FA]" : "bg-white"}`}>
      <td className="py-3 px-4 text-black">{name}</td>
      <td className="py-3 px-4 text-black">{owner}</td>
      <td className="py-3 px-4 text-black">{scope}</td>
      <td className="py-3 px-4 text-black">{desc}</td>
      <td className="py-3 px-4 flex gap-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded">✏️</button>
        <button className="bg-[#FF6F61] text-white px-2 py-1 rounded">🗑️</button>
      </td>
    </tr>
  );
};

export default BookRow;
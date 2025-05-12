import React from "react";

interface ClubRowProps {
  name: string;
  ownerId: string;
  description: string;
  onDelete: () => void;
}

const ClubRow: React.FC<ClubRowProps> = ({ name, ownerId, description, onDelete }) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4">{ownerId}</td>
      <td className="py-3 px-4">{description}</td>
      <td className="py-3 px-4">
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

export default ClubRow;

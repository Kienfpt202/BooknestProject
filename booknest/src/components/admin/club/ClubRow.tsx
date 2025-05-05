import React from "react";

interface ClubRowProps {
  name: string;
  owner: string;
  scope: string;
  desc: string;
  onDelete: () => void; // Delete action
}

const ClubRow: React.FC<ClubRowProps> = ({ name, owner, scope, desc, onDelete }) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4">{owner}</td>
      <td className="py-3 px-4">{scope}</td>
      <td className="py-3 px-4">{desc}</td>
      <td className="py-3 px-4">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
          onClick={onDelete} // Trigger delete action
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default ClubRow;

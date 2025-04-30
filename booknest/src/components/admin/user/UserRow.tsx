import React from "react";

interface UserRowProps {
  name: string;
  email: string;
  avatar_url: string;
  onDelete: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ name, email, avatar_url, onDelete }) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4">{email}</td>
      <td className="py-3 px-4">•••••••</td>
      <td className="py-3 px-4">{avatar_url}</td>
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

export default UserRow;

import React from "react";

interface ClubRowProps {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
}

const UserRow: React.FC<ClubRowProps> = ({ name, email, password, avatar_url }) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4">{email}</td>
      <td className="py-3 px-4">{password}</td>
      <td className="py-3 px-4">{avatar_url}</td>
      <td className="py-3 px-4 flex gap-2">
        <button className="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
      </td>
    </tr>
  );
};

export default UserRow;

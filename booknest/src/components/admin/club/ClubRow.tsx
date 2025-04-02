import React from "react";

interface ClubRowProps {
  name: string;
  owner: string;
  scope: string;
  desc: string;
}

const ClubRow: React.FC<ClubRowProps> = ({ name, owner, scope, desc }) => {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4">{owner}</td>
      <td className="py-3 px-4">{scope}</td>
      <td className="py-3 px-4">{desc}</td>
      <td className="py-3 px-4 flex gap-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded">✏️</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
      </td>
    </tr>
  );
};

export default ClubRow;

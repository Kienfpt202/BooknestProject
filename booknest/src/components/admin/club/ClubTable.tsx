import React from "react";
import ClubRow from "./ClubRow";

interface Club {
  id: string;
  name: string;
  description: string;
  owner_id: string;
}

interface ClubTableProps {
  clubs: Club[];
  onDelete: (id: string) => void;
}

const ClubTable: React.FC<ClubTableProps> = ({ clubs, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full table-auto text-left border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Owner ID</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <ClubRow
              key={club.id}
              name={club.name}
              ownerId={club.owner_id}
              description={club.description}
              onDelete={() => onDelete(club.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;

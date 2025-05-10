"use client";
import React from "react";
import UserRow from "./UserRow";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface UserTableProps {
  users: UserData[];
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Name", "Email", "Password", "Avatar_url", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              name={user.name}
              email={user.email}
              avatar_url={user.avatar_url}
              onDelete={() => onDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";
import UserRow from "./UserRow";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList: UserData[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "No name",
          email: data.email || "No email",
          avatar_url: data.avatar_url || "No avatar",
        };
      });
      setUsers(userList);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error while deleting user:", error);
    }
  };

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
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

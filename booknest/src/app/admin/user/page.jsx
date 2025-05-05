"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import UserTable from "@components/admin/user/UserTable";
import Pagination from "@components/admin/Pagination";
import NoDataMessage from "@components/admin/default/NoDataMessage";

const itemsPerPage = 6;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "No name",
          email: data.email || "No email",
          avatar_url: data.avatar_url || "",
        };
      });
      setUsers(userList);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error while deleting user:", error);
    }
  };

  const totalItems = users.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6">
        <Navbar />
        <div className="mt-6">
          {users.length === 0 ? (
            <NoDataMessage /> // Hiển thị khi không có người dùng
          ) : (
            <>
              <UserTable users={currentUsers} onDelete={handleDelete} />
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserPage;

"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import ClubTable from "@components/admin/club/ClubTable";
import Pagination from "@components/admin/Pagination";
import NoDataMessage from "@components/admin/default/NoDataMessage";

const itemsPerPage = 6;

const ClubPage = () => {
  const [clubs, setClubs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "book_clubs")); // ✅ collection đúng
      const clubList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "No name",
          description: data.description || "No description",
          owner_id: data.owner_id || "Unknown Owner", // ✅ thêm field owner_id
        };
      });
      setClubs(clubList);
    } catch (error) {
      console.error("Error getting club data:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this club?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "book_clubs", id)); // ✅ đúng collection khi delete
      setClubs((prev) => prev.filter((club) => club.id !== id));
    } catch (error) {
      console.error("Error while deleting club:", error);
    }
  };

  const totalItems = clubs.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClubs = clubs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100 p-6">
        <Navbar />
        <div className="mt-6">
          {clubs.length === 0 ? (
            <NoDataMessage />
          ) : (
            <>
              <ClubTable clubs={currentClubs} onDelete={handleDelete} />
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
};

export default ClubPage;

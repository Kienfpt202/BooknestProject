"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

import Sidebar from "@components/admin/dashboard/Sidebar";
import Navbar from "@components/admin/dashboard/Navbar";
import ClubTable from "@components/admin/club/ClubTable";
import Pagination from "@components/admin/Pagination";
import NoDataMessage from "@components/admin/default/NoDataMessage"; // Import NoDataMessage component

const itemsPerPage = 6;

const ClubPage = () => {
  const [clubs, setClubs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clubs"));
      const clubList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "No name",
          description: data.description || "No description",
          image_url: data.image_url || "",
        };
      });
      setClubs(clubList);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu câu lạc bộ:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá câu lạc bộ này?")) return;
    try {
      await deleteDoc(doc(db, "clubs", id));
      setClubs((prev) => prev.filter((club) => club.id !== id));
    } catch (error) {
      console.error("Lỗi khi xoá câu lạc bộ:", error);
    }
  };

  const totalItems = clubs.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClubs = clubs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#F5F5F5] p-6">
        <Navbar />
        <div className="mt-6">
          {/* Kiểm tra nếu không có câu lạc bộ */}
          {clubs.length === 0 ? (
            <NoDataMessage /> // Hiển thị thông báo nếu không có dữ liệu
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

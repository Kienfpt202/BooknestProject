"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";
import ClubRow from "./ClubRow";

interface ClubData {
  id: string;
  name: string;
  owner: string;
  scope: string;
  desc: string;
}

const ClubTable = () => {
  const [clubs, setClubs] = useState<ClubData[]>([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clubs"));
      const clubList: ClubData[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "No name",
          owner: data.owner || "No owner",
          scope: data.scope || "No scope",
          desc: data.desc || "No description",
        };
      });
      setClubs(clubList);
    } catch (error) {
      console.error("Error getting club data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this club?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "clubs", id));
      setClubs((prev) => prev.filter((club) => club.id !== id));
    } catch (error) {
      console.error("Error while deleting club:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Name", "Owner ID", "Scope", "Description", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <ClubRow
              key={club.id}
              name={club.name}
              owner={club.owner}
              scope={club.scope}
              desc={club.desc}
              onDelete={() => handleDelete(club.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;

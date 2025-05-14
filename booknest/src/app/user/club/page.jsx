"use client";
import { useState, useEffect } from "react";
import { db } from "@lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@context/usercontext";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ClubSection from "@components/user/club/ClubSection";
import Pagination from "@components/admin/Pagination";
import ClubCard from "@components/user/club/ClubCard";

const itemsPerPage = 4;

const ClubPage = () => {
  const { currentUser } = useAuth();
  const [availableClubs, setAvailableClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [myClubs, setMyClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [availablePage, setAvailablePage] = useState(1);
  const [joinedPage, setJoinedPage] = useState(1);
  const [myPage, setMyPage] = useState(1);

  const paginate = (list, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return list.slice(start, end);
  };

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "book_clubs"));
        const allClubs = querySnapshot.docs.map((doc) => ({
          clubId: doc.id,
          ...doc.data(),
        }));

        const my = [];
        const joined = [];
        const available = [];

        allClubs.forEach((club) => {
          if (club.owner_id === currentUser.uid) {
            my.push(club);
          } else if (club.members?.includes(currentUser.uid)) {
            joined.push({ ...club, status: "enrolled" });
          } else {
            available.push(club);
          }
        });

        setMyClubs(my);
        setJoinedClubs(joined);
        setAvailableClubs(available);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setLoading(false);
      }
    };

    if (currentUser?.uid) {
      fetchClubs();
    }
  }, [currentUser]);

  const handleJoinClub = (clubId) => {
    setAvailableClubs((prev) => {
      const club = prev.find((c) => c.clubId === clubId);
      if (club) {
        setJoinedClubs((prevJoined) => {
          const exists = prevJoined.some((c) => c.clubId === clubId);
          if (!exists) {
            const status = club.is_private ? "not-confirmed" : "enrolled";
            return [...prevJoined, { ...club, status }];
          }
          return prevJoined;
        });
        return prev.filter((c) => c.clubId !== clubId);
      }
      return prev;
    });
  };

  const handleExitClub = (clubId) => {
    setJoinedClubs((prevJoined) => {
      const club = prevJoined.find((c) => c.clubId === clubId);
      if (club) {
        setAvailableClubs((prevAvailable) => {
          const alreadyExists = prevAvailable.some((c) => c.clubId === clubId);
          if (!alreadyExists) {
            return [...prevAvailable, { ...club, status: undefined }];
          }
          return prevAvailable;
        });
        return prevJoined.filter((c) => c.clubId !== clubId);
      }
      return prevJoined;
    });
  };

  const handleDeleteClub = (clubId) => {
    setMyClubs((prev) => prev.filter((club) => club.clubId !== clubId));
    setAvailableClubs((prev) => prev.filter((club) => club.clubId !== clubId));
    setJoinedClubs((prev) => prev.filter((club) => club.clubId !== clubId));
  };

  const paginatedAvailable = paginate(availableClubs, availablePage);
  const paginatedJoined = paginate(joinedClubs, joinedPage);
  const paginatedMy = paginate(myClubs, myPage);

  return (
    <div className="flex bg-gray-100">
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        <div className="pt-20 px-6 space-y-10 overflow-auto min-h-screen">
          {loading ? (
            <p>Loading clubs...</p>
          ) : (
            <>
              {/* Available Clubs Section */}
              <ClubSection
                title="Available clubs"
                clubs={paginatedAvailable}
                onJoin={handleJoinClub}
              />
              <Pagination
                totalItems={availableClubs.length}
                itemsPerPage={itemsPerPage}
                currentPage={availablePage}
                onPageChange={setAvailablePage}
              />

              {/* Joined Clubs Section */}
              <ClubSection
                title="Joined clubs"
                clubs={paginatedJoined}
                onExit={handleExitClub}
                onUndoJoinRequest={handleExitClub}
              />
              <Pagination
                totalItems={joinedClubs.length}
                itemsPerPage={itemsPerPage}
                currentPage={joinedPage}
                onPageChange={setJoinedPage}
              />

              {/* My Clubs Section */}
              <ClubSection
                title="My Clubs"
                clubs={paginatedMy}
                isMyClub
                showCreateButton
              />
              <Pagination
                totalItems={myClubs.length}
                itemsPerPage={itemsPerPage}
                currentPage={myPage}
                onPageChange={setMyPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubPage;

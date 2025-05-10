"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";

import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ClubSection from "@components/user/club/ClubSection";

const ClubPage = () => {
  const [availableClubs, setAvailableClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [myClubs, setMyClubs] = useState([]);

  const { currentUser } = useAuth(); // currentUser.uid

  useEffect(() => {
    const fetchClubs = async () => {
      if (!currentUser) return;

      try {
        const clubsSnapshot = await getDocs(collection(db, "book_clubs"));
        const allClubs = clubsSnapshot.docs.map((doc) => ({
          clubId: doc.id,
          ...doc.data(),
        }));

        const myClubList = [];
        const joinedClubList = [];
        const availableClubList = [];

        for (const club of allClubs) {
          const isOwner = club.owner_id === currentUser.uid;

          const memberDocId = `${club.clubId}_${currentUser.uid}`;
          const memberDocRef = doc(db, "book_club_members", memberDocId);
          const memberDocSnap = await getDoc(memberDocRef);
          const isMember = memberDocSnap.exists();

          if (isOwner) {
            myClubList.push(club);
            joinedClubList.push(club); // chủ club cũng là "member" để tiện xử lý UI
            availableClubList.push(club); // nếu muốn hiển thị club của mình trong Available
          } else if (isMember) {
            joinedClubList.push(club);
          } else {
            availableClubList.push(club);
          }
        }

        setMyClubs(myClubList);
        setJoinedClubs(joinedClubList);
        setAvailableClubs(availableClubList);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, [currentUser]);

  const handleJoinClub = (clubId) => {
    setAvailableClubs((prev) => {
      const clubToJoin = prev.find((club) => club.clubId === clubId);
      if (!clubToJoin) return prev;

      setJoinedClubs((prevJoined) =>
        prevJoined.some((c) => c.clubId === clubId)
          ? prevJoined
          : [...prevJoined, { ...clubToJoin, status: "enrolled" }]
      );

      return prev.filter((club) => club.clubId !== clubId);
    });
  };

  const handleExitClub = (clubId) => {
    setJoinedClubs((prev) => {
      const clubToExit = prev.find((club) => club.clubId === clubId);
      if (!clubToExit) return prev;

      setAvailableClubs((prevAvailable) => [...prevAvailable, { ...clubToExit, status: undefined }]);
      return prev.filter((club) => club.clubId !== clubId);
    });
  };

  return (
    <div className="flex bg-gray-100">
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen">
          <ClubSection title="Available clubs" clubs={availableClubs} onJoin={handleJoinClub} />
          <ClubSection title="Joined clubs" clubs={joinedClubs} onExit={handleExitClub} />
          <ClubSection title="My Clubs" clubs={myClubs} isMyClub showCreateButton />
        </div>
      </div>
    </div>
  );
};

export default ClubPage;

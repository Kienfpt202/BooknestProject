"use client";

import { useState } from "react";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ClubSection from "@components/user/club/ClubSection";

const ClubPage = () => {
  // Initial data for clubs
  const [availableClubs, setAvailableClubs] = useState([
    { clubId: "1", name: "Public Club", owner: "Owner A", description: "A public club", status: undefined },
    { clubId: "2", name: "Private Club", owner: "Owner B", description: "A private club", status: "not-confirmed" },
  ]);

  const [joinedClubs, setJoinedClubs] = useState([
    { clubId: "3", name: "Joined Club", owner: "Owner C", description: "Already joined", status: "enrolled" },
  ]);

  const [myClubs, setMyClubs] = useState([
    { clubId: "4", name: "My Club", owner: "Owner D", description: "My own club", status: undefined },
  ]);

  // Handle joining a club
  const handleJoinClub = (clubId) => {
    setAvailableClubs((prevAvailableClubs) => {
      const clubToJoin = prevAvailableClubs.find((club) => club.clubId === clubId);
      if (clubToJoin) {
        // Update the joined club's status
        const updatedClub = {
          ...clubToJoin,
          status: clubToJoin.status === "not-confirmed" ? "not-confirmed" : "enrolled",
        };

        // Add the club to the joinedClubs list only if it doesn't already exist
        setJoinedClubs((prevJoinedClubs) => {
          const isAlreadyJoined = prevJoinedClubs.some((club) => club.clubId === clubId);
          if (!isAlreadyJoined) {
            return [...prevJoinedClubs, updatedClub];
          }
          return prevJoinedClubs;
        });

        // Remove the club from the availableClubs list
        return prevAvailableClubs.filter((club) => club.clubId !== clubId);
      }
      return prevAvailableClubs;
    });
  };

  // Handle exiting a club
  const handleExitClub = (clubId) => {
    setJoinedClubs((prevJoinedClubs) => {
      const clubToExit = prevJoinedClubs.find((club) => club.clubId === clubId);
      if (clubToExit) {
        // Update the club's status to make it available again
        const updatedClub = { ...clubToExit, status: undefined };

        // Add the club back to the availableClubs list
        setAvailableClubs((prevAvailableClubs) => [...prevAvailableClubs, updatedClub]);

        // Remove the club from the joinedClubs list
        return prevJoinedClubs.filter((club) => club.clubId !== clubId);
      }
      return prevJoinedClubs;
    });
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Main content */}
        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen">
          {/* Available Clubs */}
          <ClubSection title="Available clubs" clubs={availableClubs} onJoin={handleJoinClub} />

          {/* Joined Clubs */}
          <ClubSection title="Joined clubs" clubs={joinedClubs} onExit={handleExitClub} />

          {/* My Clubs */}
          <ClubSection title="My Clubs" clubs={myClubs} isMyClub showCreateButton />
        </div>
      </div>
    </div>
  );
};

export default ClubPage;
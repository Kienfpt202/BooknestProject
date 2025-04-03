"use client";
import React from "react";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import DiscussionCard from "@components/user/club/discussion/DiscussionCard";
import PollCard from "@components/user/club/discussion/PollCard";
import ActiveMembers from "@components/user/club/discussion/ActiveMembers";
import FloatingButton from "@components/user/club/discussion/FloatingButton";

const ClubLayout = () => {
  // Mẫu dữ liệu để render
  const discussions = [
    {
      user: { avatar: "/images/user1.jpg", name: "John Doe" },
      content: "What are your thoughts on Harry Potter?",
      agree: 25,
      disagree: 10,
      like: 50,
      comments: 15,
    },
    {
      user: { avatar: "/images/user2.jpg", name: "Jane Smith" },
      content: "Should we discuss 'Pippi Longstocking' next?",
      agree: 40,
      disagree: 5,
      like: 30,
      comments: 20,
    },
  ];

  const poll = {
    question: "What should we read next?",
    options: [
      { text: "Harry Potter", votes: 60 },
      { text: "Pippi Longstocking", votes: 25 },
      { text: "Conan", votes: 10 },
    ],
  };

  const activeMembers = [
    { avatar: "/images/user1.jpg", name: "John Doe", active: true },
    { avatar: "/images/user2.jpg", name: "Jane Smith", active: false },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col w-full p-6">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-1 gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Recent Discussions:</h2>
            {discussions.map((discussion, index) => (
              <DiscussionCard key={index} {...discussion} />
            ))}
            <PollCard {...poll} />
          </div>

          {/* Active Members Sidebar */}
          <div className="w-64">
            <ActiveMembers members={activeMembers} />
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingButton onClick={() => alert("Create new discussion or poll")} />
      </div>
    </div>
  );
};

export default ClubLayout;

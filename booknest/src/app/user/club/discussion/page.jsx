// pages/dashboard.jsx
"use client";

import { useState } from 'react';
import Sidebar from '@components/user/dashboard/Sidebar';
import Navbar from '@components/user/dashboard/Navbar';
import DiscussionCard from '@components/user/club/discussion/DiscussionCard';
import DiscussionThread from '@components/user/club/discussion/DiscussionThread';
import ActiveMembers from '@components/user/club/discussion/ActiveMembers';
import NewDiscussionModal from '@components/user/club/discussion/NewDiscussionModal';

export default function Dashboard() {
  const [discussions, setDiscussions] = useState([
    {
      userName: 'Nguyen Kien',
      avatar: '/avatars/nguyen-kien.jpg',
      content: "My thoughts after reading the book 'How to Win Friends & Influence'",
      agreeCount: 2,
      disagreeCount: 2,
      commentCount: 3,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDiscussion = (content) => {
    const newDiscussion = {
      userName: 'Current User', // Replace with actual user data
      avatar: '/avatars/current-user.jpg', // Replace with actual user avatar
      content,
      agreeCount: 0,
      disagreeCount: 0,
      commentCount: 0,
    };
    setDiscussions([newDiscussion, ...discussions]);
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar (Fixed on the left) */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      {/* Main content (Offset to avoid sidebar) */}
      <div className="flex-1 ml-64">
        {/* Navbar (Fixed at the top) */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Main Content Area (Add padding-top to avoid navbar overlap) */}
        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen">
          <div className="flex space-x-6">
            {/* Left Section: Recent Discussions and Discussion Thread */}
            <div className="flex-1">
              {/* Recent Discussion Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent discussion:</h2>
                {discussions.map((discussion, index) => (
                  <DiscussionCard
                    key={index}
                    userName={discussion.userName}
                    avatar={discussion.avatar}
                    content={discussion.content}
                    agreeCount={discussion.agreeCount}
                    disagreeCount={discussion.disagreeCount}
                    commentCount={discussion.commentCount}
                  />
                ))}
              </div>

              {/* Discussion Thread Section */}
              <DiscussionThread
                userName="Nguyen Kien"
                content="Which book in the book club do you prefer?"
              />
            </div>

            {/* Right Sidebar: Active Members */}
            <div className="w-64">
              <ActiveMembers />
            </div>
          </div>
        </div>

        {/* Floating Action Button (Plus Icon) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* New Discussion Modal */}
        <NewDiscussionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateDiscussion}
        />
      </div>
    </div>
  );
}
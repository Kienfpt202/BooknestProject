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
      userName: 'Nguyen Chi Kien',
      avatar: '/avatars/nguyen-kien.jpg',
      content: "My thoughts after reading the book 'How to Win Friends & Influence People' by Dale Carnegie are as follows...",
      agreeCount: 25,
      disagreeCount: 15,
      commentCount: 0,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDiscussion = (content) => {
    const newDiscussion = {
      userName: 'Hoang Huy',
      avatar: '/avatars/hoang-huy.jpg',
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

        {/* Main Content Area */}
        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen flex">
          {/* Discussions Section */}
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent discussions</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                + New Discussion
              </button>
            </div>

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

            {/* Discussion Thread Section */}
            <div className="mt-6">
              <DiscussionThread
                userName="Nguyen Chi Kien"
                content="Which book will be the next book discussion in the group, there are 3 books to consider. Which book do you prefer?"
              />
            </div>
          </div>

          {/* Right Sidebar: Active Members */}
          <div className="w-1/4 p-4 bg-white shadow-md rounded-lg">
            <ActiveMembers />
          </div>
        </div>
      </div>

      {/* New Discussion Modal */}
      <NewDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDiscussion}
      />
    </div>
  );
}
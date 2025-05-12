// app/club/discussion/[clubId]/page.jsx
'use client';

import React, { useState, useEffect } from 'react'; // Added React import
import Sidebar from '@components/user/dashboard/Sidebar';
import Navbar from '@components/user/dashboard/Navbar';
import DiscussionCard from '@components/user/club/discussion/DiscussionCard';
import DiscussionThread from '@components/user/club/discussion/DiscussionThread';
import ActiveMembers from '@components/user/club/discussion/ActiveMembers';
import NewDiscussionModal from '@components/user/club/discussion/NewDiscussionModal';

export default function ClubDiscussionPage({ params }) {
  const resolvedParams = React.use(params); // Now React is defined
  const { clubId } = resolvedParams;

  const [discussions, setDiscussions] = useState([
    {
      userName: 'Nguyen Chi Kien',
      avatar: '/images/default-avatar.png',
      content: "My thoughts after reading the book 'How to Win Friends & Influence People' by Dale Carnegie are as follows...",
      agreeCount: 25,
      disagreeCount: 15,
      commentCount: 0,
      book: "How to Win Friends & Influence People",
    },
    {
      userName: 'Nguyen Chi Kien',
      avatar: '/images/default-avatar.png',
      content: "Which book will be the next book discussion in the group, there are 3 books to consider. Which book do you prefer?",
      pollOptions: ['Book A', 'Book B', 'Book C'],
      voteCounts: { 'Book A': 0, 'Book B': 0, 'Book C': 0 },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDiscussion = ({ content, book, pollOptions }) => {
    const newDiscussion = {
      userName: 'Hoang Huy',
      avatar: '/avatars/hoang-huy.jpg',
      content,
      agreeCount: 0,
      disagreeCount: 0,
      commentCount: 0,
      ...(book && { book }),
      ...(pollOptions && { pollOptions }),
      ...(pollOptions && { voteCounts: pollOptions.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}) }),
    };
    setDiscussions([newDiscussion, ...discussions]);
  };

  const handleVote = (index, option) => {
    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((discussion, i) =>
        i === index && discussion.pollOptions
          ? {
              ...discussion,
              voteCounts: {
                ...discussion.voteCounts,
                [option]: (discussion.voteCounts[option] || 0) + 1,
              },
            }
          : discussion
      )
    );
  };

  useEffect(() => {
    console.log('Fetching discussions for clubId:', clubId);
  }, [clubId]);

  return (
    <div className="flex bg-gray-100">
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen flex">
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

            {discussions.map((discussion, index) =>
              discussion.pollOptions ? (
                <DiscussionThread
                  key={index}
                  userName={discussion.userName}
                  content={discussion.content}
                  pollOptions={discussion.pollOptions}
                  voteCounts={discussion.voteCounts}
                  onVote={(option) => handleVote(index, option)}
                />
              ) : (
                <DiscussionCard
                  key={index}
                  userName={discussion.userName}
                  avatar={discussion.avatar}
                  content={discussion.content}
                  agreeCount={discussion.agreeCount}
                  disagreeCount={discussion.disagreeCount}
                  commentCount={discussion.commentCount}
                  book={discussion.book}
                />
              )
            )}
          </div>

          <div className="w-1/4 p-4 bg-white shadow-md rounded-lg">
            <ActiveMembers />
          </div>
        </div>
      </div>

      <NewDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDiscussion}
      />
    </div>
  );
}
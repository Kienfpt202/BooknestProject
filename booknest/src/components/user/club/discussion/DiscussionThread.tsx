// components/DiscussionThread.tsx
import React from 'react';
import BookList from './BookList';

interface DiscussionThreadProps {
  userName: string;
  content: string;
}

const DiscussionThread: React.FC<DiscussionThreadProps> = ({ userName, content }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      {/* Header */}
      <h3 className="font-semibold text-gray-800">{userName}</h3>
      <p className="text-gray-600 mt-2">{content}</p>
      {/* Placeholder for Comments */}
      <div className="mt-4">
        <p className="text-gray-500 italic">No comments yet.</p>
      </div>
      {/* Related Books */}
      <BookList />
    </div>
  );
};

export default DiscussionThread;
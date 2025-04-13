// components/DiscussionCard.tsx
import React from 'react';

interface DiscussionCardProps {
  userName: string;
  avatar: string;
  content: string;
  agreeCount: number;
  disagreeCount: number;
  commentCount: number;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  userName,
  avatar,
  content,
  agreeCount,
  disagreeCount,
  commentCount,
}) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      {/* Avatar */}
      <img
        src={avatar}
        alt={`${userName}'s avatar`}
        className="w-10 h-10 rounded-full mr-3"
      />
      {/* Discussion Content */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{userName}</p>
        <p className="text-gray-600">{content}</p>
        {/* Buttons and Comments */}
        <div className="flex items-center mt-2 space-x-3">
          <button className="flex items-center px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
            <span className="mr-1">Agree</span>
            <span>{agreeCount}</span>
          </button>
          <button className="flex items-center px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
            <span className="mr-1">Disagree</span>
            <span>{disagreeCount}</span>
          </button>
          <a href="#" className="text-gray-600 hover:underline">
            Comments ({commentCount})
          </a>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
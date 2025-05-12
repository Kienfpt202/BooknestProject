import React from 'react';

interface DiscussionCardProps {
  userName: string;
  avatar: string;
  content: string;
  agreeCount: number;
  disagreeCount: number;
  commentCount: number;
  book?: string;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  userName,
  avatar,
  content,
  agreeCount,
  disagreeCount,
  commentCount,
  book,
}) => {
  return (
    <div className="flex items-start p-3 bg-white border border-gray-200 rounded-lg mb-2">
      <img src={avatar} alt={`${userName}'s avatar`} className="w-8 h-8 rounded-full mr-2" />
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm">{userName}</p>
        <p className="text-gray-600 text-sm">
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
          {content.length > 100 && (
            <a href="#" className="text-gray-500 text-sm hover:underline ml-1">
              More
            </a>
          )}
        </p>
        {book && <p className="text-gray-600 text-sm italic mt-1">Book: {book}</p>}
        <div className="flex items-center mt-2 space-x-2">
          <button className="flex items-center px-2 py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Agree {agreeCount}
          </button>
          <button className="flex items-center px-2 py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Disagree {disagreeCount}
          </button>
          <a href="#" className="text-gray-600 text-sm hover:underline">
            Comments ({commentCount})
          </a>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
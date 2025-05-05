import React from 'react';

interface DiscussionThreadProps {
  userName: string;
  content: string;
}

const DiscussionThread: React.FC<DiscussionThreadProps> = ({ userName, content }) => {
  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex items-start">
        <img
          src="/avatars/nguyen-kien.jpg"
          alt={`${userName}'s avatar`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{userName}</h3>
          <p className="text-gray-600 text-sm">
            {content.length > 100 ? `${content.substring(0, 100)}...` : content}
            {content.length > 100 && (
              <a href="#" className="text-gray-500 text-sm hover:underline ml-1">
                More
              </a>
            )}
          </p>
        </div>
      </div>
      {/* Voting Options */}
      <div className="mt-3 space-y-2">
        <button className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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
          Harry Potter <span className="ml-2 text-gray-500">25</span>
        </button>
        <button className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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
          Pippi Long Stocking <span className="ml-2 text-gray-500">45</span>
        </button>
        <button className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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
          Conan <span className="ml-2 text-gray-500">15</span>
        </button>
      </div>
      {/* Like and Comment Buttons */}
      <div className="flex items-center mt-3 space-x-2">
        <button className="flex items-center px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Like
        </button>
        <button className="flex items-center px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm">
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Comment
        </button>
      </div>
    </div>
  );
};

export default DiscussionThread;
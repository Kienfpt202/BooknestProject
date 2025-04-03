import React from "react";

interface User {
  avatar: string;
  name: string;
  // ... các thuộc tính khác của người dùng nếu có
}

interface DiscussionCardProps {
  user: User;
  content: string;
  agree: number;
  disagree: number;
  like: number;
  comments: number;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ user, content, agree, disagree, like, comments }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
        <span className="font-semibold">{user.name}</span>
      </div>
      <p className="mb-3">{content}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>👍 {agree}</span>
        <span>👎 {disagree}</span>
        <span>❤️ {like}</span>
        <span>💬 {comments} Comments</span>
      </div>
    </div>
  );
};

export default DiscussionCard;
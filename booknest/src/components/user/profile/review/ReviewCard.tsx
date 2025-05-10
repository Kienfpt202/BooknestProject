import React from 'react';
import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';

interface ReviewCardProps {
  name: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export default function ReviewCard({ name, time, content, likes, comments }: ReviewCardProps) {
  return (
    <div className="bg-[#fdf5f0] p-4 rounded-xl shadow border border-[#e3d4c0] w-full max-w-2xl mx-auto space-y-2">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <img src="/images/default-avatar.png" alt="avatar" className="w-8 h-8 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-[#5b3b1c]">{name}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-400 font-bold text-xl leading-none">×</button>
      </div>

      {/* Nội dung review */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {content} <button className="text-[#5b3b1c] hover:underline">...More</button>
      </p>

      {/* Ảnh minh họa */}
      <div className="h-40 bg-gray-200 rounded-md border border-dashed border-gray-300" />

      {/* Like + Comment */}
      <div className="flex justify-between items-center border-t pt-2 text-[#5b3b1c] text-sm">
        <button className="flex items-center space-x-1 hover:underline">
          <FaThumbsUp />
          <span>{likes}</span>
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1 hover:underline">
          <FaCommentDots />
          <span>{comments}</span>
          <span>Comments</span>
        </button>
      </div>
    </div>
  );
}

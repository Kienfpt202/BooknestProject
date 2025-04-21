// components/BookCard.tsx
import React from "react";
import { CalendarDays } from "lucide-react";

interface BookCardProps {
  title: string;
  author: string;
  date: string;
  coverUrl?: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, date, coverUrl }) => {
  return (
    <div className="w-[160px] min-h-[220px] bg-gradient-to-br from-[#e0d4c7] to-[#d9c7ae] rounded-xl shadow-md overflow-hidden">
      <div className="h-[140px] bg-gray-200 flex items-center justify-center">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="text-sm text-gray-500">No Cover</div>
        )}
      </div>
      <div className="p-2 text-sm">
        <h4 className="font-semibold text-brown-800">{title}</h4>
        <p className="text-gray-700">{author}</p>
        <div className="flex items-center text-xs text-gray-600 mt-1">
          <CalendarDays size={14} className="mr-1" />
          {date}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

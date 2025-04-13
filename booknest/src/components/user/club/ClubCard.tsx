// components/ClubCard.tsx
import React from 'react';
import Link from 'next/link';

interface ClubCardProps {
  clubId?: string; // Optional: Add clubId for more reliable navigation
  name: string;
  owner: string;
  time: string;
  status?: 'enrolled' | 'not-confirmed';
  isMyClub?: boolean;
}

const ClubCard: React.FC<ClubCardProps> = ({ name, owner, time, status, isMyClub }) => {
  // Use clubId if provided, otherwise fall back to name for the URL

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{owner}</p>
      <p className="text-sm text-gray-600">{time}</p>
      {status && (
        <div className="mt-2 flex items-center justify-between">
          <span
            className={`text-sm ${
              status === 'enrolled' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === 'enrolled' ? 'Enrolled' : 'Not confirmed'}
          </span>
          {status === 'not-confirmed' && (
            <button className="border border-[#8B5A2B] text-[#8B5A2B] px-3 py-1 rounded-md text-sm">
              Undo
            </button>
          )}
        </div>
      )}
      {isMyClub && (
        <div className="mt-4 flex space-x-2">
          <button className="border border-[#8B5A2B] text-[#8B5A2B] px-3 py-1 rounded-md text-sm">
            Edit
          </button>
          <Link href=''>
            <button className="border border-[#8B5A2B] text-[#8B5A2B] px-3 py-1 rounded-md text-sm">
              Member
            </button>
          </Link>
          <button className="border border-[#8B5A2B] text-[#8B5A2B] px-3 py-1 rounded-md text-sm">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ClubCard;
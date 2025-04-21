// components/ClubCard.tsx
import React from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link'
import { Pencil, Trash2, Users, Undo2 } from 'lucide-react';

interface ClubCardProps {
  clubId?: string;
  name: string;
  owner: string;
  time: string;
  status?: 'enrolled' | 'not-confirmed';
  isMyClub?: boolean;
}

const ClubCard: React.FC<ClubCardProps> = ({ name, owner, time, status, isMyClub }) => {
  const handleUndo = () => {
    toast.success('Request has been undone!');
  };

  const handleEdit = () => {
    toast('Edit Club clicked!', { icon: '✏️' });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      toast.success('Club deleted successfully!');
    }
  };

  // const handleViewMembers = () => {
  //   toast('Viewing members...', { icon: '👥' });
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 hover:shadow-lg transition duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">Owner: {owner}</p>
      <p className="text-sm text-gray-600">Time: {time}</p>

      {status && (
        <div className="mt-2 flex items-center justify-between">
          <span
            className={`text-sm font-medium ${
              status === 'enrolled' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === 'enrolled' ? 'Enrolled' : 'Not confirmed'}
          </span>
          {status === 'not-confirmed' && (
            <button
              onClick={handleUndo}
              className="flex items-center gap-1 border border-[#8B5A2B] text-[#8B5A2B] px-2 py-1 rounded-md text-sm hover:bg-[#8B5A2B] hover:text-white transition"
            >
              <Undo2 size={14} />
              Undo
            </button>
          )}
        </div>
      )}

      {isMyClub && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 border border-[#8B5A2B] text-[#8B5A2B] px-2 py-1 rounded-md text-sm hover:bg-[#8B5A2B] hover:text-white transition"
          >
            <Pencil size={14} />
            Edit
          </button>

          <Link href="club/member">
            <button
              className="flex items-center gap-1 border border-[#8B5A2B] text-[#8B5A2B] px-2 py-1 rounded-md text-sm hover:bg-[#8B5A2B] hover:text-white transition">
              <Users size={14} />
              Members
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 border border-[#8B5A2B] text-[#8B5A2B] px-2 py-1 rounded-md text-sm hover:bg-red-600 hover:text-white transition"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ClubCard;

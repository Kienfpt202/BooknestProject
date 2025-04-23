import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Pencil, Trash2, Users, Undo2, LogOut } from 'lucide-react';

interface ClubCardProps {
  clubId?: string;
  name: string;
  owner: string;
  description: string;
  status?: 'enrolled' | 'not-confirmed';
  isMyClub?: boolean;
  onJoin?: (clubId: string) => void; // Callback to notify parent component
  onExit?: (clubId: string) => void; // Callback to notify parent component for exiting
}

const ClubCard: React.FC<ClubCardProps> = ({ clubId, name, owner, description, status, isMyClub, onJoin, onExit }) => {
  const [isJoined, setIsJoined] = useState(status === 'enrolled');
  const [isPending, setIsPending] = useState(status === 'not-confirmed');

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    const userConfirmed = confirm(`Do you really want to join the club "${name}"?`);
    if (userConfirmed && onJoin && clubId) {
      onJoin(clubId); // Notify parent component
    }
  };

  const handleUndo = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setIsPending(false);
    toast.success('Your join request has been undone!');
  };

  const handleExit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    const userConfirmed = confirm(`Do you really want to exit the club "${name}"?`);
    if (userConfirmed && onExit && clubId) {
      onExit(clubId); // Notify parent component
      setIsJoined(false); // Update local state
      toast.success(`You have exited the club "${name}".`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 hover:shadow-lg transition duration-300 ease-in-out">
      <Link href={`/club/discussion/${clubId}`} passHref>
        <div className="cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">Owner: {owner}</p>
          <p className="text-sm text-gray-600">Description: {description}</p>
        </div>
      </Link>

      {isJoined ? (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-green-600 text-sm font-medium">You have joined this club</span>
          <button
            onClick={handleExit}
            className="flex items-center gap-1 border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm hover:bg-red-600 hover:text-white transition"
          >
            <LogOut size={14} />
            Exit
          </button>
        </div>
      ) : isPending ? (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-yellow-600 text-sm font-medium">Pending approval</span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 border border-yellow-600 text-yellow-600 px-2 py-1 rounded-md text-sm hover:bg-yellow-600 hover:text-white transition"
          >
            <Undo2 size={14} />
            Undo
          </button>
        </div>
      ) : (
        <button
          onClick={handleJoin}
          className="mt-2 w-full flex items-center justify-center gap-1 border border-green-600 text-green-600 px-2 py-1 rounded-md text-sm hover:bg-green-600 hover:text-white transition"
        >
          Join
        </button>
      )}

      {isMyClub && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
            className="flex items-center gap-1 border border-[#8B5A2B] text-[#8B5A2B] px-2 py-1 rounded-md text-sm hover:bg-[#8B5A2B] hover:text-white transition"
          >
            <Pencil size={14} />
            Edit
          </button>
          <Link href={`/club/member`} passHref>
            <button
              onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
              className="flex items-center gap-1 border border-[#8B5A2B] text-[#8B5A2B] px-2 py-1 rounded-md text-sm hover:bg-[#8B5A2B] hover:text-white transition"
            >
              <Users size={14} />
              Members
            </button>
          </Link>
          <button
            onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
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
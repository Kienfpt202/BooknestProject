import React from 'react';
import Link from 'next/link';
import ClubCard from './ClubCard';

interface ClubSectionProps {
  title: string;
  clubs: { clubId: string; name: string; owner: string; description: string; status?: 'enrolled' | 'not-confirmed' }[];
  isMyClub?: boolean;
  showCreateButton?: boolean;
  onJoin?: (clubId: string) => void; 
  onExit?: (clubId: string) => void; 
  onUndo?: (clubId: string) => void;
}

const ClubSection: React.FC<ClubSectionProps> = ({ title, clubs, isMyClub, showCreateButton, onJoin, onExit, onUndo }) => {
  return (
    <div className="mb-10">
      <div className="bg-[#F5E9D6] p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#8B5A2B]">{title}</h2>
        {showCreateButton && (
          <Link
            href="/user/club/newclub"
            className="border border-[#8B5A2B] text-[#8B5A2B] px-4 py-2 rounded-md transition duration-300 hover:bg-[#8B5A2B] hover:text-white"
          >
            + Create new club
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-5 p-4 bg-gray-100 rounded-b-lg">
        {clubs.map((club) => (
          <ClubCard
            key={club.clubId}
            clubId={club.clubId}
            name={club.name}
            owner={club.owner}
            description={club.description}
            status={club.status}
            isMyClub={isMyClub}
            onJoin={onJoin} // Pass the onJoin function
            onExit={onExit} // Pass the onExit function
            onUndo={onUndo}
          />
        ))}
      </div>
    </div>
  );
};

export default ClubSection;
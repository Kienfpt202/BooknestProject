import React from 'react';
import Link from 'next/link'; // import Link
import ClubCard from './ClubCard';

interface ClubSectionProps {
  title: string;
  clubs: { name: string; owner: string; time: string; status?: 'enrolled' | 'not-confirmed' }[];
  isMyClub?: boolean;
  showCreateButton?: boolean;
}

const ClubSection: React.FC<ClubSectionProps> = ({ title, clubs, isMyClub, showCreateButton }) => {
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
        {clubs.map((club, index) => (
          <ClubCard
            key={index}
            name={club.name}
            owner={club.owner}
            time={club.time}
            status={club.status}
            isMyClub={isMyClub}
          />
        ))}
      </div>
    </div>
  );
};

export default ClubSection;

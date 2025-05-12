// components/ActiveMembers.tsx
import React from 'react';

interface Member {
  name: string;
  avatar: string;
}

const members: Member[] = [
  { name: 'Hoang Huy', avatar: '/avatars/hoang-huy.jpg' },
  { name: 'Nguyen Chi Kien', avatar: '/avatars/nguyen-chi-kien.jpg' },
  { name: 'Tran Van Tuong', avatar: '/avatars/tran-van-tuong.jpg' },
  { name: 'Kevin Nguyen', avatar: '/avatars/kevin-nguyen.jpg' },
  { name: 'Nguyen Van Sinh', avatar: '/avatars/nguyen-van-sinh.jpg' },
];

const ActiveMembers: React.FC = () => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-4">Active Members</h3>
      <div className="space-y-3">
        {members.map((member, index) => (
          <div key={index} className="flex items-center">
            <img
              src="/images/default-avatar.png"
              alt={`${member.name}'s avatar`}
              className="w-8 h-8 rounded-full mr-3"
            />
            <p className="text-gray-600">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveMembers;
import React from "react";

interface Member {
  avatar: string;
  name: string;
  active?: boolean; // 'active' có thể là tùy chọn (undefined hoặc boolean)
  // ... các thuộc tính khác của thành viên nếu có
}

interface ActiveMembersProps {
  members: Member[]; // 'members' là một mảng các đối tượng 'Member'
}

const ActiveMembers: React.FC<ActiveMembersProps> = ({ members }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="font-semibold mb-3">Active Members</h3>
      {members.map((member, index) => (
        <div key={index} className="flex items-center mb-2">
          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
          <span>{member.name}</span>
          {member.active && <span className="ml-auto text-green-500">●</span>}
        </div>
      ))}
    </div>
  );
};

export default ActiveMembers;
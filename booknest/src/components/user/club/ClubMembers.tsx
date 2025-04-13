// pages/club/members.jsx
export default function ClubMembers() {
  const clubName = "BookNest Club"; // mock name thay vì dùng router.query

  // Mock data for the members table
  const members = [
    { name: 'Kristen Watson', role: 'Owner', email: 'kristen.owner@example.com' },
    { name: 'Alex Johnson', role: 'Moderator', email: 'alex.moderator@example.com' },
    { name: 'Sarah Lee', role: 'Member', email: 'sarah.member@example.com' },
    { name: 'David Kim', role: 'Member', email: 'david.member@example.com' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#5b3b1c]">{clubName}</h1>

      <table className="w-full border-collapse rounded overflow-hidden shadow-md">
        <thead className="bg-[#f3ece6] text-[#5b3b1c]">
          <tr>
            <th className="border p-3 text-left">Member Name</th>
            <th className="border p-3 text-left">Role</th>
            <th className="border p-3 text-left">Email address</th>
            <th className="border p-3 text-left">Operation</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-[#fdf5f0]' : 'bg-white'}>
              <td className="border p-3 flex items-center text-[#4b3416]">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                {member.name}
              </td>
              <td className="border p-3 text-[#5b3b1c]">{member.role}</td>
              <td className="border p-3 text-[#5b3b1c]">{member.email}</td>
              <td className="border p-3 space-x-2">
                <button className="text-white bg-[#c7a782] px-3 py-1 rounded hover:bg-[#b89772] text-sm">Edit</button>
                <button className="text-white bg-red-400 px-3 py-1 rounded hover:bg-red-500 text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

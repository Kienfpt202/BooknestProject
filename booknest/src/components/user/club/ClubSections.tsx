export const MyClubsSection = () => {
    const myClubs = [
      { name: "Club name", owner: "Owner name", date: "30/06/2025, 8:30 AM" },
      { name: "Club name", owner: "Owner name", date: "30/06/2025, 8:30 AM" }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Clubs</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Create new club
          </button>
        </div>
  
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Club name</th>
              <th className="text-left py-3 px-4">Club name</th>
            </tr>
          </thead>
          <tbody>
            {myClubs.map((club, index) => (
              <ClubRow key={index} {...club} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const ClubRow = ({ name, owner, date }: { 
    name: string;
    owner: string;
    date: string;
  }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{owner}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-4">
          <button className="text-blue-600 hover:text-blue-800">Edit</button>
          <button className="text-gray-500 hover:text-gray-700">Member</button>
          <button className="text-red-600 hover:text-red-800">Delete</button>
        </div>
      </td>
    </tr>
  );
  
  // PlusIcon component
  const PlusIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );

  
  export const JoinedClubsSection = () => {
    const joinedClubs = [
      {
        name: "Club name",
        owner: "Owner name",
        date: "30/06/2025, 9:30 AM",
        status: ""
      },
      {
        name: "Eurolied",
        owner: "",
        date: "",
        status: ""
      },
      {
        name: "Club name",
        owner: "Owner name",
        date: "30/06/2025, 8:30 AM",
        status: ""
      },
      {
        name: "Not confirmed",
        owner: "",
        date: "",
        status: "pending"
      },
      {
        name: "trade",
        owner: "",
        date: "",
        status: "trade"
      }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Joined clubs</h2>
        <div className="space-y-4">
          {joinedClubs.map((club, index) => (
            <ClubItem key={index} {...club} />
          ))}
        </div>
      </div>
    );
  };
  
  const ClubItem = ({ name, owner, date, status }: { 
    name: string;
    owner: string;
    date: string;
    status: string;
  }) => (
    <div className="p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{name}</h3>
          {owner && (
            <p className="text-sm text-gray-500">
              {owner} • {date}
            </p>
          )}
        </div>
        {status === "pending" && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
            Not confirmed
          </span>
        )}
        {status === "trade" && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            trade
          </span>
        )}
      </div>
    </div>
  );
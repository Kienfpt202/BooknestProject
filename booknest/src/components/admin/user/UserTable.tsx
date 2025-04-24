import UserRow from "./UserRow";

const users = [
  { name: "Kristin Watson’s club", email: "9784", password: "Private", avatar_url: "bla bla bla" },
  { name: "Kristin Watson’s club", email: "9784", password: "Public", avatar_url: "bla bla bla" },
];

const UserTable = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Name", "Email", "Password", "Avatar_url", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow key={index} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

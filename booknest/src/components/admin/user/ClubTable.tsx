import ClubRow from "./ClubRow";

const clubs = [
  { name: "Kristin Watson’s club", owner: "9784", scope: "Private", desc: "bla bla bla" },
  { name: "Kristin Watson’s club", owner: "9784", scope: "Public", desc: "bla bla bla" },
];

const ClubTable = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["Name", "Owner ID", "Scope", "Description", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clubs.map((club, index) => (
            <ClubRow key={index} {...club} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;

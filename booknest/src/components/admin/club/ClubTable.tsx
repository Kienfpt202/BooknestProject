import BookRow from "./ClubRow";

const books = [
  { name: "Kristin Watson’s club", owner: "9784", scope: "Private", desc: "bla bla bla" },
  { name: "Kristin Watson’s club", owner: "9784", scope: "Public", desc: "bla bla bla" },
];

const ClubTable = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F5F5F5]">
          <tr>
            {["Name", "Owner ID", "Scope", "Description", "Operation"].map((col) => (
              <th key={col} className="py-3 px-4 text-black">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BookRow key={index} {...book} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;
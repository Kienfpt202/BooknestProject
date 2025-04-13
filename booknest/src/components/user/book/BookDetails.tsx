interface BookDetailsProps {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BookDetails = ({
  title,
  author,
  genre,
  publicationYear,
  currentPage,
  totalPages,
  onPageChange,
}: BookDetailsProps) => {
  return (
    <div className="bg-[#F5ECE3] p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-2 gap-4 text-[#8B5E3B]">
        <div>
          <p className="font-semibold text-sm">Title</p>
          <p className="text-sm">{title}</p>
        </div>
        <div>
          <p className="font-semibold text-sm">Author</p>
          <p className="text-sm">{author}</p>
        </div>
        <div>
          <p className="font-semibold text-sm">Genre</p>
          <p className="text-sm">{genre}</p>
        </div>
        <div>
          <p className="font-semibold text-sm">Publication year</p>
          <p className="text-sm">{publicationYear}</p>
        </div>
        <div className="col-span-2 flex items-center mt-2">
          <label className="font-semibold text-sm mr-2">Read from page</label>
          <input
            type="number"
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            min={1}
            max={totalPages}
            className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A7824B] w-16 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
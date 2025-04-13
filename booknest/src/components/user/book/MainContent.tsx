import { useState } from "react";
import BookDetails from "./BookDetails";
import Pagination from "./Pagination";
import ActionButtons from "./ActionButtons";

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(50);
  const totalPages = 100;

  const book = {
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publicationYear: 2024,
  };

  return (
    <div className="flex-1 ml-64 md:ml-0">
      {/* Main content with padding to avoid navbar overlap */}
      <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen flex flex-col md:flex-row">
        {/* Book Details Section (3/4 width on desktop, full width on mobile) */}
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4 text-[#8B5E3B]">
            Book Details
          </h2>
          <div className="space-y-4">
            <BookDetails
              title={book.title}
              author={book.author}
              genre={book.genre}
              publicationYear={book.publicationYear}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <ActionButtons />
          </div>
        </div>

        {/* Placeholder for Sidebar-like Section (1/4 width on desktop, full width on mobile) */}
        <div className="w-full md:w-1/4 p-4 bg-white shadow-md rounded-lg mt-6 md:mt-0">
          <h2 className="text-xl font-semibold mb-4 text-[#8B5E3B]">
            Reading Stats
          </h2>
          <p className="text-sm text-gray-600">
            This section can display reading progress, stats, or recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
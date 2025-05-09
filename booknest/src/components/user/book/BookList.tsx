import BookCard from "./BookCard";

interface BookListProps {
  title: string;
  books: {
    bookId: string; // Thêm bookId để xác định đường dẫn tới trang chi tiết
    title: string;
    author: string;
    cover?: string;
    views: number;
    date: string;
  }[];
}

const BookList = ({ title, books }: BookListProps) => {
  return (
    <section className="mt-6">

      <h2 className="text-2xl font-bold text-[#8B5E3B] mb-4">{title}</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;

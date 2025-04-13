
import React from 'react';

const books = ['Harry Potter', 'Frog Song', 'Coran'];

const BookList: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        {books.map((book, index) => (
          <span key={index} className="text-gray-600">
            {book}
            {index < books.length - 1 && ','}
          </span>
        ))}
        <a href="#" className="text-gray-600 hover:underline">
          More
        </a>
      </div>
    </div>
  );
};

export default BookList;
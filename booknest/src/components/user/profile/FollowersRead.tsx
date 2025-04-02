import React from "react";

const books = [
  {
    title: "Harry Potter",
    image: "/harry-potter.jpg",
    link: "#",
  },
  {
    title: "Harry Potter",
    image: "/harry-potter.jpg",
    link: "#",
  },
  {
    title: "Harry Potter",
    image: "/harry-potter.jpg",
    link: "#",
  },
];

const FollowersRead = () => {
  return (
    <div className="bg-[#F3E9DC] p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold text-[#704214]">Followers Also Read</h2>
      <div className="flex space-x-4 mt-3">
        {books.map((book, index) => (
          <a key={index} href={book.link} className="group relative w-32 h-40 flex flex-col items-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-40 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
            />
            <p className="text-sm mt-2">{book.title}</p>
          </a>
        ))}
      </div>
      <button className="text-[#487AA1] mt-3 text-sm">More...</button>
    </div>
  );
};

export default FollowersRead;

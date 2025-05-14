"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  views: number;
  date: string;
  description: string;
  genre: string;
  pageCount: number;
  publisher: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  coverImage,
  description,
  genre,
  pageCount,
}) => {
  return (
    <Link href={`/user/book/detail/${id}`} passHref>
      <div className="flex bg-[#fdf6ec] border border-[#e6ccb2] rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden">
        <div className="w-24 h-32 relative">
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-l-xl"
          />
        </div>
        <div className="flex-1 px-4 py-2">
          <h3 className="text-lg font-semibold text-[#5a3b2e]">{title}</h3>
          <p className="text-sm text-[#7a5c3e]">by {author}</p>
          <p className="text-xs text-[#a1886f] mt-1 line-clamp-2">{description}</p>
          <div className="text-xs text-[#b89b7c] mt-2 flex justify-between">
            <span>{genre}</span>
            <span>{pageCount} pages</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

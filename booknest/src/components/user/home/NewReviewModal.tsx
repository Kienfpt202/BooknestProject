"use client";

import React, { useState, useEffect, useRef } from "react";
import { db } from "@lib/firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@context/usercontext";

interface Book {
  id: string;
  title: string;
  cover_image_url: string;
  author: string;
}

interface NewReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    id: string;
    author: string;
    avatar: string;
    content: string;
    image: string;
    bookTitle: string;
    bookAuthor: string;
  }) => void;
}

export const NewReviewModal: React.FC<NewReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const bookList: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Book, "id">),
        }));
        setBooks(bookList);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (content.trim().length < 10) {
      return setError("Review content must be at least 10 characters.");
    }

    if (!selectedBook) {
      return setError("Please select a book from the list.");
    }

    if (!currentUser) {
      return setError("You need to be logged in to post a review.");
    }

    const fallbackImage = "/default-book-cover.jpg";

    const reviewData = {
      author: currentUser.displayName || "Anonymous",
      avatar: currentUser.avatar || "/default-avatar.png",
      user_id: currentUser.uid, // Added user_id
      content: content.trim(),
      bookTitle: selectedBook.title,
      bookAuthor: selectedBook.author,
      image: selectedBook.cover_image_url || fallbackImage,
      createdAt: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      onSubmit({
        id: docRef.id,
        author: reviewData.author,
        avatar: reviewData.avatar,
        content: reviewData.content,
        image: reviewData.image,
        bookTitle: reviewData.bookTitle,
        bookAuthor: reviewData.bookAuthor,
      });

      setContent("");
      setSelectedBook(null);
      onClose();
    } catch (err) {
      console.error("Error posting review:", err);
      setError("Failed to post review. Please try again.");
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4 text-gray-800">Create a New Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select a Book
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedBook?.id || ""}
              onChange={(e) =>
                setSelectedBook(books.find((b) => b.id === e.target.value) || null)
              }
            >
              <option value="">-- Choose a book --</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Your Thoughts
            </label>
            <textarea
              className="w-full min-h-[80px] border border-gray-300 rounded p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write at least 10 characters..."
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Post Review
          </button>
        </form>
      </div>
    </div>
  );
};

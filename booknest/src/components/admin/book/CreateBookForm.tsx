'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { addBook } from "@lib/firestore"; // Import addBook từ firestore.ts

const CreateBookForm = () => {
  const router = useRouter();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    cover_image_url: "",
    description: "",
    publisher: "",
    page_count: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchBookData = async (title: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}`
      );
      const bookData = response.data.items?.[0]?.volumeInfo || null;

      if (bookData) {
        setBook({
          title: bookData.title || "",
          author: bookData.authors?.join(", ") || "Unknown",
          genre: bookData.categories?.join(", ") || "",
          cover_image_url: bookData.imageLinks?.thumbnail || "",
          description: bookData.description || "",
          publisher: bookData.publisher || "",
          page_count: bookData.pageCount || 0,
        });
      } else {
        alert("No book found with that title.");
      }
    } catch (error) {
      console.error("Error fetching book data: ", error);
      alert("Failed to fetch book data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: name === "page_count" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addBook({
        title: book.title,
        author: book.author,
        genre: book.genre.split(",").map((g) => g.trim()).join(", "),
        coverImage: book.cover_image_url,
        description: book.description,
        publisher: book.publisher,
        pageCount: book.page_count,
      });
      router.push("/admin/book");
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            onBlur={() => fetchBookData(book.title)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre (comma separated)
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            id="cover_image_url"
            name="cover_image_url"
            value={book.cover_image_url}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="page_count" className="block text-sm font-medium text-gray-700">
            Page Count
          </label>
          <input
            type="number"
            id="page_count"
            name="page_count"
            value={book.page_count}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;

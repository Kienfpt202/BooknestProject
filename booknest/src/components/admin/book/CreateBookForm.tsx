
'use client'; // Đảm bảo đây là Client Component

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // <-- sửa ở đây
import { db } from "@lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateBookForm = () => {
  const router = useRouter();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
    cover_image_url: "",
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
          publication_year: bookData.publishedDate || "",
          cover_image_url: bookData.imageLinks?.thumbnail || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "books"), {
        title: book.title,
        author: book.author,
        genre: book.genre.split(","),
        publication_year: parseInt(book.publication_year),
        cover_image_url: book.cover_image_url,
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
            onBlur={() => fetchBookData(book.title)} // Fetch book data when the input loses focus
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
          <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700">
            Publication Year
          </label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={book.publication_year}
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

"use client";

import { useState, useCallback } from "react";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import Review from "@components/user/home/Review";
import FollowerList from "@components/user/home/FollowerList";
import NewReviewModal from "@components/user/home/NewReviewModal";

const PersonalBlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: "1",
      author: "Hoàng Huy",
      avatar: "/avatar1.jpg",
      content: "Chào mọi người! Đây là bài viết đầu tiên...",
      image: "/images/DeMen_Book.jpg",
      bookTitle: "Dế Mèn Phiêu Lưu Ký",
      bookAuthor: "Tô Hoài",
    },
    {
      id: "2",
      author: "Ngọc Lan",
      avatar: "/avatar3.jpg",
      content: "What an amazing book!",
      image: "/images/Atomic_Book.jpg",
      bookTitle: "Atomic Habits",
      bookAuthor: "James Clear",
    },
  ]);

  const handleAddReview = useCallback(
    (newReview) => {
      setReviews((prevReviews) => [newReview, ...prevReviews]);
    },
    [setReviews]
  );

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-[70px] h-[calc(100vh-70px)]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 z-50">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="pt-20 px-6 space-y-6 overflow-auto min-h-screen flex">
          {/* Reviews */}
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Most viewed/reacted reviews</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                + New Review
              </button>
            </div>

            {reviews.map((review) => (
              <Review
                key={review.id}
                {...review}
              />
            ))}
          </div>

          {/* Follower List */}
          <div className="w-1/4 p-4 bg-white shadow-md rounded-lg">
            <FollowerList />
          </div>
        </div>
      </div>

      {/* Modal */}
      <NewReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default PersonalBlog;

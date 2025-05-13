"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@components/user/dashboard/Sidebar";
import Navbar from "@components/user/dashboard/Navbar";
import ProfileHeader from "@components/user/profile/edit-profile/ProfileHeader";
import ReviewCard from "@components/user/profile/review/ReviewCard";
import { useAuth } from "@context/usercontext";
import { db } from "@lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "reviews"),
          where("user_id", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const reviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserReviews(reviews);
      } catch (err) {
        console.error("Failed to fetch user reviews:", err);
      }
    };

    fetchUserReviews();
  }, [currentUser]);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="flex bg-[#f5f6f8] min-h-screen">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Main layout */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16">
          <Navbar />
        </header>

        {/* Content */}
        <section className="p-6 space-y-8">
          <ProfileHeader
            name={currentUser.name}
            avatarUrl={currentUser.avatar || "/default-avatar.png"}
            currentUserName={currentUser.name}
          />

          {/* Book Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-[#5b3b1c] mb-4">Your book reviews:</h3>
            <div className="space-y-6">
              {userReviews.length === 0 ? (
                <p className="text-gray-500">You haven't posted any reviews yet.</p>
              ) : (
                userReviews.map((r) => <ReviewCard key={r.id} {...r} />)
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

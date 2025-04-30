'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import StatsCard from "./StatsCard";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    accounts: 0,
    books: 0,
    book_clubs: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const booksSnapshot = await getDocs(collection(db, "books"));
        const clubsSnapshot = await getDocs(collection(db, "book_clubs"));

        setCounts({
          accounts: usersSnapshot.size,
          books: booksSnapshot.size,
          book_clubs: clubsSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className="p-8 bg-[#F4ECE4] min-h-screen">
      <h1 className="text-center text-2xl font-semibold text-[#5B3B1D] mb-6">
        Welcome to your dashboard, BookNest
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <StatsCard count={counts.accounts} label="Accounts" href="/admin/user" />
        <StatsCard count={counts.books} label="Books" href="/admin/book" />
        <StatsCard count={counts.book_clubs} label="Clubs" href="/admin/club" />
      </div>

      <section className="mt-12">
        <FeatureItem title="Add books" href="/admin/book/create" />
      </section>
    </main>
  );
};

interface FeatureItemProps {
  title: string;
  href: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, href }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex items-start mt-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-[#E9D6C8] p-4 rounded-xl"
    >
      <div className="bg-[#6B4226] text-white p-2 rounded-full mr-4 transition-all duration-300 hover:bg-[#845A3A]">
        +
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#5B3B1D]">{title}</h3>
        <p className="text-sm text-[#7A5230]">
          Create new book content and products for our users.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

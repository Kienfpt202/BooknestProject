"use client";

import { useEffect, useState } from 'react';
import { db } from '@lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Định nghĩa type cho dữ liệu thành viên
type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export default function ClubMembers({
  clubId,
  clubName = "BookNest Club"
}: {
  clubId: string;
  clubName?: string;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Quản lý trạng thái loading
  const [error, setError] = useState<string | null>(null); // Quản lý lỗi khi fetching

  useEffect(() => {
    if (!clubId) return;

    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null); // Reset lỗi mỗi khi bắt đầu fetch lại
        const q = query(
          collection(db, 'book_club_members'),
          where('club_id', '==', clubId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedMembers: Member[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Member[]; // Đảm bảo kiểu dữ liệu chính xác
        setMembers(fetchedMembers);
      } catch (error) {
        setError('Error fetching members. Please try again later.');
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [clubId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-500">
        Loading members...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-lg text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#5b3b1c]">{clubName}</h1>

      {members.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No members found for this club.
        </div>
      ) : (
        <table className="w-full border-collapse rounded overflow-hidden shadow-md">
          <thead className="bg-[#f3ece6] text-[#5b3b1c]">
            <tr>
              <th className="border p-3 text-left">Member Name</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-left">Email address</th>
              <th className="border p-3 text-left">Operation</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} className={index % 2 === 0 ? 'bg-[#fdf5f0]' : 'bg-white'}>
                <td className="border p-3 flex items-center text-[#4b3416]">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                  {member.name}
                </td>
                <td className="border p-3 text-[#5b3b1c]">{member.role}</td>
                <td className="border p-3 text-[#5b3b1c]">{member.email}</td>
                <td className="border p-3 space-x-2">
                  <button className="text-white bg-[#c7a782] px-3 py-1 rounded hover:bg-[#b89772] text-sm">
                    Edit
                  </button>
                  <button className="text-white bg-red-400 px-3 py-1 rounded hover:bg-red-500 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

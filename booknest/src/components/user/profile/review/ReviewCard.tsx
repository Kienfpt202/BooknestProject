"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { db } from "@lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "@context/usercontext";

interface ReviewCardProps {
  id: string;
  author: string;
  content: string;
  image?: string;
  bookTitle: string;
  bookAuthor: string;
  createdAt: Timestamp;
}

interface Comment {
  id: string;
  user_id: string;
  username: string;
  avatar: string;
  comment: string;
  commented_at: Timestamp;
}

export default function ReviewCard({
  id,
  author,
  content,
  image,
  bookTitle,
  bookAuthor,
  createdAt,
}: ReviewCardProps) {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const avatar = "/images/default-avatar.png";

  useEffect(() => {
    if (!currentUser) return;

    const likeRef = collection(db, "review_reaction");
    const q = query(likeRef, where("review_id", "==", id));

    const unsub = onSnapshot(q, (snapshot) => {
      const likes = snapshot.docs;
      const hasLiked = likes.some(
        (doc) => doc.data().user_id === currentUser.uid
      );
      setLiked(hasLiked);
      setLikeCount(likes.length);
    });

    return () => unsub();
  }, [currentUser, id]);

  useEffect(() => {
    const commentRef = collection(db, "review_comment");
    const q = query(commentRef, where("review_id", "==", id));

    const unsub = onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Comment, "id">),
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) return;

    const likeRef = collection(db, "review_reaction");
    const q = query(
      likeRef,
      where("review_id", "==", id),
      where("user_id", "==", currentUser.uid)
    );

    const snapshot = await getDocs(q);
    const likeDoc = snapshot.docs?.[0];

    if (liked && likeDoc) {
      await deleteDoc(doc(db, "review_reaction", likeDoc.id));
    } else {
      await addDoc(likeRef, {
        review_id: id,
        user_id: currentUser.uid,
        liked_at: Timestamp.now(),
      });
    }
  };

  const handleComment = async () => {
    if (!currentUser || newComment.trim().length === 0) return;

    await addDoc(collection(db, "review_comment"), {
      review_id: id,
      user_id: currentUser.uid,
      username: currentUser.displayName || currentUser.name || "Anonymous",
      avatar: currentUser.avatar || avatar,
      comment: newComment.trim(),
      commented_at: Timestamp.now(),
    });

    setNewComment("");
  };

  return (
    <div className="bg-[#fdf5f0] p-4 rounded-xl shadow border border-[#e3d4c0] w-full max-w-2xl mx-auto space-y-3">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Image
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-[#5b3b1c]">{author}</p>
          <p className="text-xs text-gray-500">{createdAt.toDate().toLocaleString()}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>

      {/* Optional image */}
      {image && (
        <div className="rounded-md overflow-hidden">
          <Image
            src={image}
            alt="Review image"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Book info */}
      <p className="text-sm italic text-gray-600">
        📖 {bookTitle} — {bookAuthor}
      </p>

      {/* Like + Comment */}
      <div className="flex justify-between items-center border-t pt-2 text-[#5b3b1c] text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${liked ? "text-red-500 font-medium" : "hover:underline"}`}
        >
          <FaThumbsUp />
          <span>{likeCount}</span>
          <span>{liked ? "Liked" : "Like"}</span>
        </button>

        <span className="flex items-center space-x-1">
          <FaCommentDots />
          <span>{comments.length}</span>
          <span>Comments</span>
        </span>
      </div>

      {/* Comment input */}
      {currentUser && (
        <div className="mt-2">
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={2}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="mt-2 bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      )}

      {/* Comment list */}
      <div className="mt-3 space-y-2">
        {loading ? (
          <div className="text-center text-gray-400">Loading comments...</div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <Image
                src={c.avatar || avatar}
                alt={c.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm w-full">
                <p className="font-semibold">{c.username}</p>
                <p>{c.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

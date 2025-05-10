"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@context/usercontext";

interface ReviewProps {
  id: string;
  author: string;
  avatar: string; // original avatar passed but overridden
  content: string;
  image?: string;
  bookTitle: string;
  bookAuthor: string;
}

interface Comment {
  id: string;
  user_id: string;
  username: string;
  avatar: string;
  comment: string;
  commented_at: Timestamp;
}

const Review: React.FC<ReviewProps> = ({
  id,
  author,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  avatar: _avatar, // original avatar (unused)
  content,
  image,
  bookTitle,
  bookAuthor,
}) => {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Always use default avatar for reviewer
  const avatar = "/images/default-avatar.png";

  // --- Effect: Fetch like status and count ---
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

  // --- Effect: Fetch comments ---
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
    });

    return () => unsub();
  }, [id]);

  // --- Handler: Like/unlike review ---
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

  // --- Handler: Post comment ---
  const handleComment = async () => {
    if (!currentUser || newComment.trim().length === 0) return;

    await addDoc(collection(db, "review_comment"), {
      review_id: id,
      user_id: currentUser.uid,
      username: currentUser.displayName || currentUser.name || "Anonymous",
      avatar: currentUser.avatar || "/images/default-avatar.png",
      comment: newComment.trim(),
      commented_at: Timestamp.now(),
    });

    setNewComment("");
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-6">
      {/* Author info */}
      <div className="flex items-center mb-2">
        <Image
          src={avatar}
          alt={author}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link href={`/user/follower_profile`} className="font-semibold ml-3">
          {author}
        </Link>
      </div>

      {/* Review content */}
      <p className="text-gray-700 mb-2">{content}</p>

      {/* Optional image */}
      {image && (
        <div className="mt-3">
          <Image
            src={image}
            alt="Book Cover"
            width={500}
            height={300}
            className="w-full rounded-md object-cover"
          />
        </div>
      )}

      {/* Book info */}
      <p className="mt-2 text-sm italic text-gray-600">
        📖 {bookTitle} — {bookAuthor}
      </p>

      {/* Reaction bar */}
      <div className="flex items-center justify-between mt-3 text-gray-500">
        <button
          onClick={handleLike}
          className={`transition ${
            liked ? "text-red-500 font-semibold" : "hover:text-red-500"
          }`}
        >
          👍 {liked ? "Liked" : "Like"} ({likeCount})
        </button>
        <span>💬 {comments.length} Comment{comments.length !== 1 && "s"}</span>
      </div>

      {/* Comment input */}
      {currentUser && (
        <div className="mt-4">
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
      <div className="mt-4 space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <Image
              src={c.avatar || "/images/default-avatar.png"}
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
        ))}
      </div>
    </div>
  );
};

export default Review;

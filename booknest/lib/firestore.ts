// lib/firestore.ts
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    addDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "./firebase";

  /* ========== TYPE DEFINITIONS ========== */
  
  interface UserProfile {
    displayName: string;
    email: string;
    photoURL?: string;
    bio?: string;
    created_at?: Timestamp;
  }
  
  interface Book {
    title: string;
    author: string;
    description?: string;
    coverImage?: string;
    genre?: string;
    publishedYear?: number;
  }
  
  interface Review {
    user_id: string;
    book_id: string;
    content: string;
    rating: number;
    created_at?: Timestamp;
  }
  
  interface ReadingListItem {
    id: string;
    user_id: string;
    book_id: string;
    status: string;
    progress: number;
  }
  
  interface Comment {
    user_id: string;
    review_id?: string;
    discussion_id?: string;
    content: string;
    created_at?: Timestamp;
  }
  
  interface Reaction {
    user_id: string;
    review_id?: string;
    comment_id?: string;
    type: "Like" | "Love" | "Wow";
    created_at?: Timestamp;
  }  
  
  /* ========== USERS ========== */
  
  export const createUserProfile = async (uid: string, userData: UserProfile) => {
    await setDoc(doc(db, "users", uid), {
      ...userData,
      created_at: serverTimestamp(),
    });
  };
  
  export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? { ...(docSnap.data() as UserProfile) } : null;
  };
  
  export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    await updateDoc(doc(db, "users", uid), data);
  };
  
  /* ========== BOOKS ========== */
  
  export const getAllBooks = async (): Promise<(Book & { id: string })[]> => {
    const querySnapshot = await getDocs(collection(db, "books"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Book) }));
  };
  
  export const addBook = async (bookData: Book): Promise<string> => {
    const docRef = await addDoc(collection(db, "books"), bookData);
    return docRef.id;
  };
  
  /* ========== REVIEWS ========== */
  
  export const addReview = async (reviewData: Review): Promise<string> => {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...reviewData,
      created_at: serverTimestamp(),
    });
    return docRef.id;
  };
  
  export const deleteReview = async (reviewId: string) => {
    await deleteDoc(doc(db, "reviews", reviewId));
  };
  
  export const getReviewsByBook = async (bookId: string): Promise<(Review & { id: string })[]> => {
    const q = query(
      collection(db, "reviews"),
      where("book_id", "==", bookId),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Review) }));
  };
  
  export const getCommentsByReview = async (reviewId: string): Promise<(Comment & { id: string })[]> => {
    const q = query(
      collection(db, "comments"),
      where("review_id", "==", reviewId),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Comment),
    }));
  };
  
  export const getReactionsByReview = async (reviewId: string): Promise<(Reaction & { id: string })[]> => {
    const q = query(collection(db, "reactions"), where("review_id", "==", reviewId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Reaction),
    }));
  };

  export const getReactionsByComment = async (commentId: string): Promise<(Reaction & { id: string })[]> => {
    const q = query(collection(db, "reactions"), where("comment_id", "==", commentId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Reaction),
    }));
  };
  
  export const getCommentsAndReactionsByReview = async (reviewId: string) => {
    const comments = await getCommentsByReview(reviewId);
    const reactions = await getReactionsByReview(reviewId);
    
    return { comments, reactions };
  };

  /* ========== READING LIST ========== */
  
  export const updateReadingList = async (
    userId: string,
    bookId: string,
    status: string,
    progress = 0
  ) => {
    const readingListRef = doc(db, "readingLists", `${userId}_${bookId}`);
    await setDoc(readingListRef, {
      user_id: userId,
      book_id: bookId,
      status,
      progress,
    });
  };
  
  export const getUserReadingList = async (
    userId: string
  ): Promise<ReadingListItem[]> => {
    const q = query(collection(db, "readingLists"), where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc): ReadingListItem => ({
        id: doc.id,
        ...(doc.data() as Omit<ReadingListItem, "id">),
      })
    );
  };
  
  /* ========== FOLLOW ========== */
  
  export const followUser = async (followerId: string, followingId: string) => {
    const followRef = doc(db, "follows", `${followerId}_${followingId}`);
    await setDoc(followRef, {
      follower_id: followerId,
      following_id: followingId,
      created_at: serverTimestamp(),
    });
  };
  
  export const unfollowUser = async (followerId: string, followingId: string) => {
    const followRef = doc(db, "follows", `${followerId}_${followingId}`);
    await deleteDoc(followRef);
  };
  
  /* ========== BOOK CLUB MEMBERS ========== */
  /* ========== BOOK CLUB ========== */

// Thêm hàm tạo câu lạc bộ
export const createClub = async (
  clubName: string,
  description: string,
  isPrivate: boolean,
  ownerId: string
) => {
  const docRef = await addDoc(collection(db, "book_club"), {
    name: clubName,
    description,
    is_private: isPrivate,
    owner_id: ownerId,
    created_at: serverTimestamp(),
  });
  return docRef.id; // Trả về ID của câu lạc bộ mới tạo
};

  
  export const joinBookClub = async (clubId: string, userId: string, role = "Member") => {
    const memberRef = doc(db, "bookClub_members", `${clubId}_${userId}`);
    await setDoc(memberRef, {
      club_id: clubId,
      user_id: userId,
      role,
      joined_at: serverTimestamp(),
    });
  };
  
  export const leaveBookClub = async (clubId: string, userId: string) => {
    const memberRef = doc(db, "bookClub_members", `${clubId}_${userId}`);
    await deleteDoc(memberRef);
  };
  
  /* ========== DISCUSSION ========== */
  
  export const addDiscussion = async (
    clubId: string,
    userId: string,
    title: string,
    content: string
  ): Promise<string> => {
    const docRef = await addDoc(collection(db, "discussions"), {
      club_id: clubId,
      user_id: userId,
      title,
      content,
      created_at: serverTimestamp(),
    });
    return docRef.id;
  };
  
  /* ========== COMMENT ========== */
  
  export const addComment = async ({
    userId,
    reviewId = null,
    discussionId = null,
    content,
  }: {
    userId: string;
    reviewId?: string | null;
    discussionId?: string | null;
    content: string;
  }): Promise<string> => {
    const docRef = await addDoc(collection(db, "comments"), {
      user_id: userId,
      review_id: reviewId,
      discussion_id: discussionId,
      content,
      created_at: serverTimestamp(),
    });
    return docRef.id;
  };
  
  /* ========== REACTION ========== */
  
  export const likeReview = async (userId: string, reviewId: string, type: "Like" | "Love" | "Wow" = "Like") => {
    const reactionRef = doc(db, "reactions", `${userId}_review_${reviewId}`);
    await setDoc(reactionRef, {
      user_id: userId,
      review_id: reviewId,
      comment_id: null,
      type,
      created_at: serverTimestamp(),
    });
  };
  
  export const likeComment = async (userId: string, commentId: string, type: "Like" | "Love" | "Wow" = "Like") => {
    const reactionRef = doc(db, "reactions", `${userId}_comment_${commentId}`);
    await setDoc(reactionRef, {
      user_id: userId,
      review_id: null,
      comment_id: commentId,
      type,
      created_at: serverTimestamp(),
    });
  };
  
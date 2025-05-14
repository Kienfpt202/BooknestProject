import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// TYPE DEFINITIONS

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
  publisher: string;
  pageCount: number;
}

interface ReadingListItem {
  id: string;
  user_id: string;
  book_id: string;
  status: string;
  progress: number;
}

interface BookClub {
  name: string;
  description: string;
  is_private: boolean;
  owner_id: string;
  created_at: Timestamp;
}

interface BookClubMember {
  club_id: string;
  user_id: string;
  role: string;
  joined_at: Timestamp;
}

// USERS

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

// BOOKS

export const addBook = async (bookData: Book): Promise<string> => {
  const docRef = await addDoc(collection(db, "books"), bookData);
  return docRef.id;
};

export const getAllBooks = async (): Promise<(Book & { id: string })[]> => {
  const snapshot = await getDocs(collection(db, "books"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Book) }));
};

export const getBooksByGenre = async (genre: string): Promise<(Book & { id: string })[]> => {
  const q = query(collection(db, "books"), where("genre", "==", genre));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Book) }));
};

export const searchBooks = async (keyword: string): Promise<(Book & { id: string })[]> => {
  const lowerKeyword = keyword.toLowerCase();
  const snapshot = await getDocs(collection(db, "books"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Book) }))
    .filter(
      (book) =>
        book.title.toLowerCase().includes(lowerKeyword) ||
        book.author.toLowerCase().includes(lowerKeyword)
    );
};

// READING LIST

export const updateReadingList = async (
  userId: string,
  bookId: string,
  status: string,
  progress = 0
) => {
  const ref = doc(db, "readingLists", `${userId}_${bookId}`);
  await setDoc(ref, {
    user_id: userId,
    book_id: bookId,
    status,
    progress,
  });
};

export const getUserReadingList = async (userId: string): Promise<ReadingListItem[]> => {
  const q = query(collection(db, "readingLists"), where("user_id", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc): ReadingListItem => ({
      id: doc.id,
      ...(doc.data() as Omit<ReadingListItem, "id">),
    })
  );
};

// BOOK CLUBS

export const createClub = async (
  clubName: string,
  description: string,
  isPrivate: boolean,
  ownerId: string
): Promise<string> => {
  const docRef = await addDoc(collection(db, "book_clubs"), {
    name: clubName,
    description,
    is_private: isPrivate,
    owner_id: ownerId,
    created_at: serverTimestamp(),
  });
  return docRef.id;
};

export const getClubById = async (clubId: string): Promise<(BookClub & { id: string }) | null> => {
  const docSnap = await getDoc(doc(db, "book_clubs", clubId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as BookClub & { id: string } : null;
};

export const getClubsByUser = async (userId: string): Promise<(BookClub & { id: string })[]> => {
  const q = query(collection(db, "book_club_members"), where("user_id", "==", userId));
  const snapshot = await getDocs(q);
  const clubIds = snapshot.docs.map((doc) => doc.data().club_id);
  const clubFetches = await Promise.all(clubIds.map((id) => getClubById(id)));
  return clubFetches.filter(Boolean) as (BookClub & { id: string })[];
};

export const getClubMembers = async (clubId: string): Promise<BookClubMember[]> => {
  const q = query(collection(db, "book_club_members"), where("club_id", "==", clubId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as BookClubMember),
  }));
};

export const addMemberToClub = async (
  clubId: string,
  userId: string,
  role: string = "member"
) => {
  const ref = doc(db, "book_club_members", `${clubId}_${userId}`);
  await setDoc(ref, {
    club_id: clubId,
    user_id: userId,
    role,
    joined_at: serverTimestamp(),
  });
};

export const joinClub = async (clubId: string, userId: string) => {
  const q = query(
    collection(db, "book_club_members"),
    where("club_id", "==", clubId),
    where("user_id", "==", userId)
  );
  const existing = await getDocs(q);
  if (!existing.empty) return "already-joined";

  await addDoc(collection(db, "book_club_members"), {
    club_id: clubId,
    user_id: userId,
    joined_at: serverTimestamp(),
    status: "enrolled",
  });
  return "success";
};

// COMMENTS

export const addCommentToReview = async (
  userId: string,
  reviewId: string,
  content: string
): Promise<string> => {
  const docRef = await addDoc(collection(db, "comments"), {
    user_id: userId,
    review_id: reviewId,
    discussion_id: null,
    content,
    created_at: serverTimestamp(),
  });
  return docRef.id;
};

export const addCommentToDiscussion = async (
  userId: string,
  discussionId: string,
  content: string
): Promise<string> => {
  const docRef = await addDoc(collection(db, "comments"), {
    user_id: userId,
    review_id: null,
    discussion_id: discussionId,
    content,
    created_at: serverTimestamp(),
  });
  return docRef.id;
};

//  DISCUSSIONS

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


// REACTIONS


export const likeReview = async (userId: string, reviewId: string) => {
  const ref = doc(db, "reactions", `${userId}_review_${reviewId}`);
  await setDoc(ref, {
    user_id: userId,
    review_id: reviewId,
    comment_id: null,
    created_at: serverTimestamp(),
  });
};

export const likeComment = async (userId: string, commentId: string) => {
  const ref = doc(db, "reactions", `${userId}_comment_${commentId}`);
  await setDoc(ref, {
    user_id: userId,
    review_id: null,
    comment_id: commentId,
    created_at: serverTimestamp(),
  });
};

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// ======================================
// ** AUTHENTICATION OPERATIONS **
// ======================================

// Đăng ký người dùng mới
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    // Gán role 'user' mặc định cho người dùng mới
    const user = await createNewUser(email, password, displayName);

    // Cập nhật thông tin người dùng trong Firestore
    await createUserProfileInFirestore(user.uid, email, displayName);

    return user;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

// Đăng nhập người dùng
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Đăng xuất người dùng
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Gửi email reset mật khẩu
export const sendResetPasswordEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Send reset email error:", error);
    throw error;
  }
};

// Lắng nghe sự thay đổi trạng thái đăng nhập
export const listenToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// ======================================
// ** FIRESTORE OPERATIONS **
// ======================================

// Tạo tài khoản người dùng mới và gán role
const createNewUser = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!user) {
    throw new Error("User not found after registration.");
  }

  // Cập nhật thông tin người dùng (name, etc)
  await updateProfile(user, { displayName });
  
  return user;
};

// Tạo hồ sơ người dùng trong Firestore
const createUserProfileInFirestore = async (uid: string, email: string, displayName: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      displayName,
      role: "user",  // Vai trò mặc định là 'user'
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Create Firestore user error:", error);
    throw error;
  }
};

// Lấy vai trò người dùng từ Firestore
export const getUserRoleFromFirestore = async (uid: string): Promise<string> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data().role; // Trả về vai trò của người dùng
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};

// ======================================
// ** HELPER FUNCTIONS **
// ======================================

// Lấy người dùng hiện tại
export const getCurrentUser = () => auth.currentUser;


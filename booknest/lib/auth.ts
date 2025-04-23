import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";

import { auth, db } from "./firebase";

// Đăng ký và tạo hồ sơ Firestore
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Cập nhật displayName trong Firebase Auth
    await updateProfile(userCredential.user, { displayName });

    // Xác định vai trò (admin nếu đây là tài khoản đầu tiên, còn lại là user)
    const role = await getUserRole();

    // Tạo user profile trong Firestore với vai trò xác định
    await createUserProfileInFirestore(
      userCredential.user.uid,
      email,
      displayName,
      role
    );

    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

// Tạo hồ sơ người dùng trong Firestore
export const createUserProfileInFirestore = async (
  uid: string,
  email: string,
  displayName: string,
  role: string
) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      displayName,
      role, // Vai trò người dùng (admin hoặc user)
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Create Firestore user error:", error);
    throw error;
  }
};

// Đăng nhập
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
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

// Xác nhận đổi mật khẩu (từ oobCode)
export const confirmResetPassword = async (
  oobCode: string,
  newPassword: string
) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return true;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

// Đăng xuất
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Lấy người dùng hiện tại
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Nghe sự thay đổi trạng thái đăng nhập
export const listenToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

// Xác định vai trò của người dùng (admin nếu đây là tài khoản đầu tiên, còn lại là user)
export const getUserRole = async (): Promise<string> => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const users = usersSnapshot.docs;
    // Nếu chưa có người dùng nào, tài khoản đầu tiên sẽ là admin
    return users.length === 0 ? "admin" : "user";
  } catch (error) {
    console.error("Error fetching users:", error);
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

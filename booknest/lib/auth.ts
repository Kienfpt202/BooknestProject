import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  confirmPasswordReset,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// Đăng ký
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", error);
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

// Đặt lại mật khẩu (sau khi đã nhận được oobCode từ URL)
export const confirmResetPassword = async (oobCode: string, newPassword: string) => {
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

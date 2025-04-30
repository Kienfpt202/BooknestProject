"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { db } from "@lib/firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { registerUser } from "@lib/auth";
import { FirebaseError } from "firebase/app";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 🆕

  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  
    const trimmedEmail = email.trim();
  
    if (!isValidEmail(trimmedEmail)) {
      setError("Invalid email.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Tạo tài khoản
      const user = await registerUser(trimmedEmail, password, username);
      if (user) {
        router.push("/auth/login");
      } else {
        setError("Registration failed. Please try again.");
      }
  
      // Kiểm tra xem đã có user nào chưa
      const usersSnapshot = await getDocs(collection(db, "users"));
      const isFirstUser = usersSnapshot.empty;
  
      // Gán role
      const role = isFirstUser ? "admin" : "user";
  
      // Tạo document trong Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: username,
        email: trimmedEmail,
        avatarUrl: "",
        role: role,
      });
  
      router.push("/auth/login");
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. Please enter a stronger password.");
      } else {
        setError(error.message || "ĐRegistration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <div className="text-center w-full">
      <p className="text-[#5B3A29] font-medium text-lg">Let’s sign up a new account</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isSubmitting}
        />
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          isPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          isPassword
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
        />

        <Button
          text={isSubmitting ? "Registering..." : "Register"}
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        />
        <Button
          text="Sign up with Google"
          variant="google"
          type="button"
          disabled={isSubmitting}
          onClick={() => alert("Tính năng đang phát triển 😅")}
        />

        <p className="text-sm text-[#5B3A29] mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-[#442a1a] hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
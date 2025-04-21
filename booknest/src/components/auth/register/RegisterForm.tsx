"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { registerUser } from "@lib/auth";
import { FirebaseError } from "firebase/app";

const RegisterForm = () => {
  const [username, setUsername] = useState(""); // nếu bạn lưu tên vào Firestore sau này
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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
      setError("Email không hợp lệ.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      await registerUser(trimmedEmail, password, username);
      router.push("/dashboard");
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="text-center w-full">
      <p className="text-[#5B3A29] font-medium text-lg">Let’s sign up a new account</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          type="password"
          placeholder="Enter Password"
          isPassword
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          isPassword
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        <Button text="Register" variant="primary" type="submit" />
        <Button text="Sign up with Google" variant="google" />

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

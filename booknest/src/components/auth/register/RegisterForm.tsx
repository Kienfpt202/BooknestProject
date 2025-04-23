"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
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
      setError("Email không hợp lệ.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true); // 🆕

    try {
      await registerUser(trimmedEmail, password, username);
      router.push("/auth/login"); // Redirect to the login after successful registration
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "auth/email-already-in-use") {
        setError("Email đã được sử dụng.");
      } else {
        setError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // 🆕
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

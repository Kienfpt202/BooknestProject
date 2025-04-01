"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Xử lý reset password ở đây
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#5A3E2B]">Don’t worry</h2>
      <p className="text-[#5A3E2B]">Get a new password here!</p>

      <InputField
        type="email"
        placeholder="Enter the email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        hasToggle
      />
      <InputField
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        hasToggle
      />

      <Button type="submit">Update password</Button>
    </form>
  );
};

export default ResetPasswordForm;

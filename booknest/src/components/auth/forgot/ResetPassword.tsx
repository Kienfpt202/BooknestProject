"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InputField from "./InputField";
import Button from "./Button";
import { confirmResetPassword } from "@lib/auth";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState(""); // Không cần thiết nhưng giữ lại theo thiết kế
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setError("Link reset password không hợp lệ hoặc đã hết hạn.");
    }
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!oobCode) {
      setError("Thiếu mã xác thực (oobCode).");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      await confirmResetPassword(oobCode, password);
      setSuccess("Đặt lại mật khẩu thành công!");
      setTimeout(() => router.push("/login"), 3000); // chuyển hướng sau 3 giây
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#5A3E2B]">Don’t worry</h2>
      <p className="text-[#5A3E2B]">Get a new password here!</p>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

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

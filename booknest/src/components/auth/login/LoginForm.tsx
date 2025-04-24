"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@components/auth/login/InputField";
import Button from "@components/auth/login/Button";
import Link from "next/link";
import { loginUser } from "@lib/auth";
import { useAuth } from "@context/usercontext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

const LoginForm = () => {
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("booknest-user");
    if (userStr) {
      const pendingPath = localStorage.getItem("booknest-pending-path");
      if (pendingPath) {
        localStorage.removeItem("booknest-pending-path");
        router.push(pendingPath);
      } else {
        router.push("/user/profile");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
  
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential;
  
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
  
      if (!userSnap.exists()) {
        throw new Error("Tài khoản chưa được thiết lập quyền truy cập.");
      }
  
      const docData = userSnap.data();
  
      const userData = {
        uid: user.uid,
        email: user.email ?? "",
        name: docData.displayName || user.displayName || "Unknown User",
        avatar: docData.avatarUrl || user.photoURL || "",
        role: docData.role,
      };
  
      if (!userData.role) {
        throw new Error("Không xác định được vai trò người dùng.");
      }
  
      setCurrentUser(userData);
  
      const pendingPath = localStorage.getItem("booknest-pending-path");
      if (pendingPath) {
        localStorage.removeItem("booknest-pending-path");
        router.push(pendingPath);
      } else if (userData.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user/profile");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Login error:", err);
      } else {
        setError("Có lỗi xảy ra.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-grow p-4">
      <div className="w-full max-w-[400px] text-center">
        <div className="bg-[#f5e1c0] p-6 rounded-lg shadow-lg">
          <h2 className="text-[#5a3e2b] font-semibold text-lg mb-2">
            Welcome to BookNest system!
          </h2>
          <p className="text-[#5a3e2b] mb-4">Log into your account now!</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <InputField
              label="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <InputField
              label="Enter Password"
              type="password"
              name="password"
              showEyeIcon
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />

            <p className="text-right text-sm">
              <Link
                href="/auth/forgot"
                className="text-[#5a3e2b] hover:underline"
              >
                Forgot Password?
              </Link>
            </p>

            <Button
              text="Sign in with Google"
              variant="google"
              type="button"
              disabled={isSubmitting}
              onClick={() => alert("Chưa tích hợp Google Auth 😅")}
            />
            <Button
              text={isSubmitting ? "Logging in..." : "Login"}
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            />

            <p className="text-center text-sm text-[#5a3e2b] mt-4">
              First time with BookNest?{" "}
              <Link
                href="/auth/register"
                className="font-bold text-[#442a1a] hover:underline"
              >
                Register now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

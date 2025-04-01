"use client";
import AuthLayout from "@components/auth/AuthLayout";
import LoginForm from "@components/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;

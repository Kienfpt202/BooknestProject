"use client";
import AuthLayout from "@components/auth/AuthLayout";
import RegisterForm from "@components/auth/register/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;

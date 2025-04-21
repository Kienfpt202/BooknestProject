import AuthLayout from "@components/auth/AuthLayout";
import ResetPasswordForm from "@components/auth/forgot/ResetPassword";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;


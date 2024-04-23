import {AuthBanner} from "@/auth/components/AuthBanner.tsx";
import {LoginForm} from "@/auth/components/LoginForm.tsx";

export const LoginPage = () => {
  return (
    <main className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 min-h-dvh">
      <AuthBanner />
      <LoginForm />
    </main>
  );
};
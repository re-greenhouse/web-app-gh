import {ReactElement} from "react";
import {AuthBanner} from "@/auth/components/AuthBanner.tsx";
import {RegisterForm} from "@/auth/components/RegisterForm.tsx";

export const RegisterPage = (): ReactElement => {
  return (
    <main className="grid grid-rows-[1.5fr_2fr] grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 min-h-dvh">
      <AuthBanner/>
      <RegisterForm />
    </main>
  );
};
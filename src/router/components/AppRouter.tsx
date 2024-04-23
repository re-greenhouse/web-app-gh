import {ReactElement} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@/public/pages/HomePage.tsx";
import {LoginPage} from "@/auth/pages/LoginPage.tsx";
import {RegisterPage} from "@/auth/pages/RegisterPage.tsx";

export const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
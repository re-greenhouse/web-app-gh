import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/public/pages/HomePage.tsx";
import { LoginPage } from "@/auth/pages/LoginPage.tsx";
import { RegisterPage } from "@/auth/pages/RegisterPage.tsx";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import { PrivateRoute } from "@/router/components/PrivateRoute.tsx";
import { ProfilePage } from "@/public/pages/ProfilePage.tsx";
import { CompanyPage } from "@/company/pages/CompanyPage.tsx";
import { CropsInProgressPage } from "@/crops/pages/CropsInProgressPage";
import { CropsArchivePage } from "@/crops/pages/CropsArchive";

export const AppRouter = (): ReactElement => {
  const isLogged = useAuthStore((state) => state.isLoggedIn());

  return (
    <Routes>
      <Route
        element={<PrivateRoute canActivate={isLogged} defaultDestination="/login" />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/crops" element={<CropsInProgressPage />} />
        <Route path="/archive" element={<CropsArchivePage />} />
      </Route>
      <Route
        element={<PrivateRoute canActivate={!isLogged} defaultDestination="/" />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

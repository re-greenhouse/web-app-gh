import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/auth/pages/LoginPage.tsx";
import { RegisterPage } from "@/auth/pages/RegisterPage.tsx";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import { PrivateRoute } from "@/router/components/PrivateRoute.tsx";
import { CompanyPage } from "@/company/pages/CompanyPage.tsx";
import { CropsArchivePage } from "@/public/pages/CropsArchive";
import { CropsInProgress } from "@/public/pages/CropsInProgress";
import { MembershipsPage } from "@/membership/pages/MembershipsPage";
import { CropsRecordsPage } from "@/crops/pages/CropRecordsPage";
import { ProfilePage } from "@/profile/pages/ProfilePage";
import {NotificationsProvider} from "@/notifications/context/useNotificationContext.tsx";

export const AppRouter = (): ReactElement => {
  const isLogged = useAuthStore((state) => state.isLoggedIn());

  return (
    <Routes>
      <Route
        element={
          <PrivateRoute canActivate={isLogged} defaultDestination="/login" />
        }
      >
        <NotificationsProvider>
          <Route path="/" element={<CropsInProgress />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/archive" element={<CropsArchivePage />} />
          <Route path="/memberships" element={<MembershipsPage />} />
          <Route
            path="/records/:cropId/:cropPhase"
            element={<CropsRecordsPage />}
          />
        </NotificationsProvider>
      </Route>
      <Route
        element={
          <PrivateRoute canActivate={!isLogged} defaultDestination="/" />
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

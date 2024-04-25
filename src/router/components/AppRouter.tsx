import {ReactElement} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@/public/pages/HomePage.tsx";
import {LoginPage} from "@/auth/pages/LoginPage.tsx";
import {RegisterPage} from "@/auth/pages/RegisterPage.tsx";
import {useAuthStore} from "@/auth/stores/useAuthStore.ts";
import {PrivateRoute} from "@/router/components/PrivateRoute.tsx";
import {CreateProfilePage} from "@/profiles/pages/CreateProfilePage.tsx";

export const AppRouter = (): ReactElement => {
  const {token, profile} = useAuthStore((state) => ({token: state.token, profile: state.profile}));

  return (
    <Routes>
      <Route element={<PrivateRoute canActivate={token !== undefined} defaultDestination="/login" />}>
        <Route element={<PrivateRoute canActivate={profile !== undefined} defaultDestination="/crear-perfil" />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<PrivateRoute canActivate={profile === undefined} defaultDestination="/" />}>
          <Route path="/crear-perfil" element={<CreateProfilePage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute canActivate={token === undefined} defaultDestination="/" />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};
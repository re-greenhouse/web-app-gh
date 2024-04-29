import {ReactElement} from "react";
import {useAuthStore} from "@/auth/stores/useAuthStore.ts";
import {PrimaryButton} from "@/shared/components/Buttons";

export const HomePage = (): ReactElement => {
  const profile = useAuthStore(state => state.profile)!;
  const logout = useAuthStore(state => state.logout);

  return (
    <div className="grid grid-rows-[auto_1fr] bg-light min-h-dvh">
      <div className="flex justify-between items-center p-6 lg:p-12">
        <div className="flex justify-center items-center text-primary hover:scale-95 duration-300 gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="h-8 w-8">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
          <p className="font-bold text-2xl">Greenhouse</p>
        </div>
        <svg className="w-7 h-7 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
        </svg>
      </div>
      <main className="p-6 lg:p-12">
        <p className="text-2xl">¡Bienvenid@ de vuelta, <span className="font-semibold">{profile.firstName}</span>!</p>
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-center text-gray-600 font-medium mb-6">
            Aquí se mostrarán las diferentes operaciones de gestión de cultivos.
          </p>
          <div className="w-fit">
            <PrimaryButton
              onClick={logout}
              label="Cerrar sesión"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
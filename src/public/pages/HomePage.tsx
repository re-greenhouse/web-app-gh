import {ReactElement} from "react";
import {useAuthStore} from "@/auth/stores/useAuthStore.ts";
import {PrimaryButton} from "@/shared/components/Buttons";
import {BaseLayout} from "@/shared/layouts/BaseLayout.tsx";

export const HomePage = (): ReactElement => {
  const profile = useAuthStore(state => state.profile)!;
  const logout = useAuthStore(state => state.logout);

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
};
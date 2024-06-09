import { ReactElement, useState } from "react";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import { PrimaryButton } from "@/shared/components/Buttons";
import { BaseLayout } from "@/shared/layouts/BaseLayout.tsx";
import { TextField } from "@/shared/components/TextField.tsx";

export const ProfilePage = (): ReactElement => {
  const profile = useAuthStore(state => state.profile)!;
  const logout = useAuthStore(state => state.logout);
  
  const [firstName, setFirstName] = useState<string>(profile.firstName);
  const [lastName, setLastName] = useState<string>(profile.lastName);

  return (
    <BaseLayout>
      <div className="mx-auto rounded-2xl drop-shadow-md p-12 bg-white w-fit">
        <img
          src={profile.iconUrl}
          alt="Foto de perfil"
          className="w-52 h-52 object-cover object-center rounded-full border-2 border-primary"
        />
        <div>
          <TextField
            id="first-name"
            type="text"
            label="Nombre"
            value={firstName}
            onValueChange={setFirstName}
          />
          <TextField
            id="first-name"
            type="text"
            label="Apellido"
            value={lastName}
            onValueChange={setLastName}
          />
          <div className="mt-6 space-y-2">
            <PrimaryButton label="Actualizar datos"/>
            <PrimaryButton onClick={logout} label="Cerrar sesión"/>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

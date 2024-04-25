import {ReactElement} from "react";
import {CreateProfileForm} from "@/profiles/components/CreateProfileForm.tsx";

export const CreateProfilePage = (): ReactElement => {
  return (
    <main className="flex flex-col justify-around items-center bg-light p-6 min-h-dvh">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-primary">Cree su perfil:</h1>
        <p className="font-medium text-gray-600">Antes de comenzar, cuéntanos un poco acerca de ti.</p>
        <CreateProfileForm />
      </div>
    </main>
  );
};
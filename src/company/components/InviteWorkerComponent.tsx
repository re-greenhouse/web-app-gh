import { ReactElement, useState } from "react";
import { PrimaryButton } from "@/shared/components/Buttons";
import { useRegisterForm } from "../hooks/InviteWorker.hook";
import { ReferableTextField } from "@/shared/components/ReferableTextField.tsx";
import { Spinner } from "@/shared/components/Spinner.tsx";

export const InviteComponent = ({
  hideDialog,
}: {
  hideDialog: () => void;
}): ReactElement => {
  const {
    usernameRef,
    firstNameRef,
    lastNameRef,
    emailRef,
    isLoading,
    onSubmit,
  } = useRegisterForm();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsAdmin(value === "Administrador");
  };

  return (
    <div>
      <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex w-full justify-center h-full z-20 content-center items-center">
        <div className="bg-background lg:w-1/3 lg:h-2/3 content-start justify-center text-center rounded-2xl">
          <form
            onSubmit={(e) => onSubmit(e, isAdmin)}
            className="bottom-0 py-2"
          >
            <div className="flex flex-col justify-center w-full p-5">
              <span className="flex justify-center w-full">
                <h1 className="mx-auto py-5 text-inviteCompontentText font-bold text-xl">
                  Invitar trabajador
                </h1>
                <span>
                  <button onClick={hideDialog}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              </span>
              <div className="text-start w-full">
                <h1 className="py-5 text-inviteCompontentText font-semibold text-lg">
                  Información del trabajador
                </h1>
                <div className="flex justify-between gap-3 lg:flex-row flex-col">
                  <div className="flex flex-col w-full">
                    <ReferableTextField
                      id="first-name"
                      ref={firstNameRef}
                      label="Nombre"
                      placeholder="Ingrese el nombre del trabajador"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <ReferableTextField
                      id="last-name"
                      ref={lastNameRef}
                      label="Apellido"
                      placeholder="Ingrese el apellido del trabajador"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-3 py-5 lg:flex-row flex-col">
                  <div className="flex flex-col w-full">
                    <ReferableTextField
                      id="username"
                      ref={usernameRef}
                      label="Nombre de usuario"
                      placeholder="Ingrese el nombre de usuario del trabajador"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <h1>Rol</h1>
                    <select
                      className="border-2 border-gray-300 rounded-md w-full p-2 mt-2"
                      defaultValue="Tecnico"
                      onChange={handleAdminChange}
                    >
                      <option value="Tecnico">Técnico supervisor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <ReferableTextField
                    id="correo"
                    ref={emailRef}
                    label="Correo electrónico"
                    placeholder="Ingrese el correo del trabajador"
                    type="mail"
                  />
                </div>
                <div className="flex flex-col p-10 gap-8 w-full">
                  <PrimaryButton disabled={isLoading} type="submit">
                    {isLoading ? (
                      <Spinner color="#15F5BA" height={24} />
                    ) : (
                      <span className="text-md">
                        Enviar invitación por correo
                      </span>
                    )}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

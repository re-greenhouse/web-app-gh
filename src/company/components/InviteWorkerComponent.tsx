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
      <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex items-center justify-center z-20">
        <div className="bg-background w-full max-w-lg h-auto md:max-h-[90vh] rounded-2xl p-5 relative">
          <form
            onSubmit={(e) => onSubmit(e, isAdmin, "employee.invited")}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <h1 className="text-inviteCompontentText font-bold text-2xl">
                Invitar trabajador
              </h1>

              <div className="mt-4 w-full text-start">
                <h2 className="text-inviteCompontentText font-semibold text-lg mb-4">
                  Información del trabajador
                </h2>
                <div className="flex flex-wrap gap-3">
                  <div className="w-full">
                    <ReferableTextField
                      id="first-name"
                      ref={firstNameRef}
                      label="Nombre"
                      placeholder="Ingrese el nombre del trabajador"
                      type="text"
                    />
                  </div>
                  <div className="w-full ">
                    <ReferableTextField
                      id="last-name"
                      ref={lastNameRef}
                      label="Apellido"
                      placeholder="Ingrese el apellido del trabajador"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 py-5">
                  <div className="w-full">
                    <ReferableTextField
                      id="username"
                      ref={usernameRef}
                      label="Nombre de usuario"
                      placeholder="Ingrese el nombre de usuario del trabajador"
                      type="text"
                    />
                  </div>
                  <div className="w-full ">
                    <h1>Rol</h1>
                    <select
                      className="border-2 border-gray-300 rounded-md w-full p-2 mt-2"
                      defaultValue="Tecnico"
                      onChange={handleAdminChange}
                      name="role"
                    >
                      <option value="Tecnico">Técnico supervisor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <ReferableTextField
                    id="correo"
                    ref={emailRef}
                    label="Correo electrónico"
                    placeholder="Ingrese el correo del trabajador"
                    type="email"
                  />
                </div>
                <div className="flex flex-col w-full gap-5 p-5">
                  <PrimaryButton disabled={isLoading} type="submit">
                    {isLoading ? (
                      <Spinner color="#15F5BA" height={24} />
                    ) : (
                      <span className="text-md">
                        Enviar invitación por correo
                      </span>
                    )}
                  </PrimaryButton>
                  <button onClick={hideDialog} aria-label="cancel" className="">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

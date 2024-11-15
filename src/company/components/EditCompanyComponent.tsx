import { ReactElement, useState } from "react";
import { PrimaryButton } from "@/shared/components/Buttons";
import { CompanyService } from "../services/company.service";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";

type CompanyProps = {
  id: string;
  name: string;
  tin: string;
  logoUrl: string;
};

export const EditCompanyComponent = ({
  hideDialog,
  company,
}: {
  hideDialog: () => void;
  company: CompanyProps;
}): ReactElement => {
  const [companyName, setCompanyName] = useState(company.name);
  const [companyTin, setCompanyTin] = useState(company.tin);
  const [companyImage, setCompanyImage] = useState(company.logoUrl);
  const { profile, token } = useAuthStore((state) => ({
    profile: state.profile!,
    token: state.token!,
  }));

  const editCompany = async () => {
    const response = await CompanyService.editCompany(
      company.id,
      companyName,
      companyTin,
      companyImage,
      token
    );
    if (response.status === "success" && companyTin.length === 11) {
      window.location.reload();
    } else {
      alert("Error al editar la empresa.");
    }
  };

  return (
    <div>
      <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex items-center justify-center z-20">
        <div className="bg-background w-full max-w-lg h-auto md:max-h-[90vh] rounded-2xl p-5 relative flex flex-col items-center">
          <button
            onClick={hideDialog}
            aria-label="Cerrar"
            className="absolute top-4 right-4 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="mb-2 text-2xl">Editar Empresa</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Previene el comportamiento por defecto
              editCompany(); // Llama a la función para editar la empresa
            }}
            className="flex flex-col gap-5 content-center justify-center items-center w-full"
          >
            <h1>Nombre de la empresa:</h1>
            <input
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              value={companyName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <h1>RUC de la empresa:</h1>
            <input
              onChange={(e) => setCompanyTin(e.target.value)}
              type="text"
              value={companyTin}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <div className="flex flex-col justify-center items-center content-center">
              <h1>URL de foto de la empresa:</h1>
              <img src={companyImage} alt="bannerImage" className="size-36" />
            </div>
            <input
              onChange={(e) => setCompanyImage(e.target.value)}
              type="text"
              value={companyImage}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <div className="flex flex-col w-full gap-5 p-5">
              <PrimaryButton label="Cambiar" type="submit"></PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import { ReactElement } from "react";
import { BaseLayout } from "@/shared/layouts/BaseLayout.tsx";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { LoaderMessage } from "@/shared/components/LoaderMessage.tsx";
import { Table } from "@/shared/components/Table.tsx";
import { Profile } from "@/auth/models/Profile.ts";


export const CompanyPage = (): ReactElement => {
  const { isLoading, company, employees } = useCompanyPage();
  

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="flex justify-center items-center h-full">
          <LoaderMessage message="Cargando información de la empresa." />
        </div>
      </BaseLayout>
    );
  }

  if (!company) {
    return (
      <BaseLayout>
        <div className="flex justify-center items-center h-full">
          <p>Crear compañía</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="flex items-end bg-gradient-to-r from-blue-600 to-violet-600 gap-4 w-full rounded-2xl p-4 md:p-8">
        <img
          src={company.logoUrl}
          alt={`${company.name} logo`}
          className="size-24 md:size-48 object-cover object-center bg-no-repeat bg-transparent rounded-2xl"
        />
        <div className="text-light">
          <h1 className="text-xl md:text-3xl font-bold">{company.name}</h1>
          <p className="text-sm md:text-base font-medium">RUC: {company.tin}</p>
        </div>
      </div>
      <div className="mt-6 max-w-screen-md mx-auto">
        <Table<Profile>
          data={employees}
          columnNames={["Nombre", "Apellido", "Rol", "Acciones"]}
          columnValues={[
            (profile) => profile.firstName,
            (profile) => profile.lastName,
            (profile) => profile.role,
            () => {
              return (
                <p>Todo</p>
              )
            }
          ]}
        />
      </div>
    </BaseLayout>
  );
};
import { ReactElement } from "react";
import { BaseLayout } from "@/shared/layouts/BaseLayout.tsx";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { LoaderMessage } from "@/shared/components/LoaderMessage.tsx";
import { Table } from "@/shared/components/Table.tsx";
import { Profile } from "@/auth/models/Profile.ts";
import { BannerComponent } from "@/shared/components/Banner";

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
      <BannerComponent/>
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
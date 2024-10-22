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
          columnNames={["Nombre", "Nombre de usuario", "Cargo dentro de la empresa", "Acciones"]}
          columnValues={[
            (profile) => {
              return (
                <div className="flex gap-1 items-center">
                  <img src={company?.logoUrl} alt="User Image" className="size-10 rounded-full"/>
                  <span>{profile.firstName} {profile.lastName}</span>
                </div>
              )
            },
            //Cambiar elemento harcodeado
            (profile) => 'username',
            (profile) => profile.role,
            () => {
              return (
                <button
              id="dropdownDefaultButton"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   e.preventDefault();
              //   setDropdown(!dropdown);
              // }}
              className="p-3"
            >
              <svg width="5" height="16" viewBox="0 0 5 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.33301" cy="2" r="2" transform="rotate(-90 2.33301 2)" fill="#898989" />
                <circle cx="2.33301" cy="8" r="2" transform="rotate(-90 2.33301 8)" fill="#898989" />
                <circle cx="2.33301" cy="14" r="2" transform="rotate(-90 2.33301 14)" fill="#898989" />
              </svg>
            </button>
              )
            }
          ]}
        />
      </div>
    </BaseLayout>
  );
};
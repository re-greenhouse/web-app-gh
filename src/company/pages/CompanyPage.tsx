import { ReactElement, useState } from "react";
import { BaseLayout } from "@/shared/layouts/BaseLayout.tsx";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { LoaderMessage } from "@/shared/components/LoaderMessage.tsx";
import { Table } from "@/shared/components/Table.tsx";
import { Profile } from "@/auth/models/Profile.ts";
import { BannerComponent } from "@/shared/components/Banner";


export const CompanyPage = (): ReactElement => {
  const { isLoading, company, employees } = useCompanyPage();
  const [ sortOrder, setSortOrder] = useState(false);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === false ? true : false))
  }

  const sortedEmployees = [...employees].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    if (sortOrder === false) {
      return nameA > nameB ? 1 : -1
    } else {
      return nameA < nameB ? 1 : -1
    }
  });

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
      <div className="relative mb-4 mx-auto w-[80vw] flex items-center md:flex-row flex-col md:gap-0 gap-9">
            <div className=" relative flex w-[80vw]">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
              </svg>
              <input
                  type="text"
                  placeholder="Buscar"
                  value={''}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-6 pl-10 p-2 border rounded w-full mx-auto focus:outline-none focus:ring focus:current-color transition duration-300 ease-in-out"
              />
            </div>
            <div className="flex ">
              <button
                  className="inline-flex items-center text-center px-4 text-white bg-third rounded-lg p-2 gap-2 whitespace-nowrap"
                  // onClick={toggleDateSorting}
              >
                <h1>Invitar Trabajador</h1>
              </button>
            </div>
            
        </div>
      <div className="justify-center w-[80vw] mx-auto text-third text-lg">
          <strong>
            Directorio de trabajadores
        </strong>
      </div>
      <div className="mt-6 w-[80vw] mx-auto">
        <Table<Profile>
          data={sortedEmployees}
          columnNames={[
            <div className="flex gap-1 justify-center">
              <button onClick={toggleSortOrder} className="flex gap-1 items-center">
                <h1>Nombre</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-4 ${sortOrder ? "rotate-180" : ""} duration-200 hidden md:block`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
              </button>
            </div>
            ,
            <div className="flex gap-1 justify-center">
              <button className="flex gap-1  items-center">
                <h1>Nombre de usuario</h1>
                {/* <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-4 ${sortOrder ? "rotate-180" : ""} duration-200 hidden md:block`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
                </span> */}
              </button>
            </div>,
            "Cargo dentro de la empresa",
            "Acciones"
          ]}
          columnValues={[
            (profile) => {
              return (
                <div className="flex gap-1 items-center justify-center">
                  <img src={company?.logoUrl} alt="User Image" className="size-10 rounded-full "/>
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
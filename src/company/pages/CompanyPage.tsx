import { ReactElement, useEffect, useState } from "react";
import { BaseLayout } from "@/shared/layouts/BaseLayout.tsx";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { LoaderMessage } from "@/shared/components/LoaderMessage.tsx";
import { Table } from "@/shared/components/Table.tsx";
import { Profile } from "@/auth/models/Profile.ts";
import { BannerComponent } from "@/shared/components/Banner";
import { InviteComponent } from "../components/InviteWorkerComponent";
import { Sidebar } from "@/shared/components/SidebarComponent";
import { SearchBar } from "@/shared/components/SearchBar";
import { PrimaryButton } from "@/shared/components/Buttons";
import { Filter } from "@/shared/components/Filter";


type UserData = {
  firstName: string;
  lastName: string;
  role: string;
  iconUrl: string;
};

export const CompanyPage = (): ReactElement => {
  const { isLoading, company, employees } = useCompanyPage();
  const [sortOrder, setSortOrder] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [showSidebar, setSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    role: "",
    iconUrl: "",
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === false ? true : false));
  };

  const handleSidebar = () => {
    setSidebar(!showSidebar);
  };
  const handleUserData = (
    firstName: string,
    lastName: string,
    role: string,
    iconUrl: string
  ) => {
    setUserData({ firstName, lastName, role, iconUrl });
  };

  const handleClick = (
    name: string,
    lastName: string,
    role: string,
    image: string
  ) => {
    handleSidebar(), handleUserData(name, lastName, role, image);
  };

  const handleClickInvite = () => {
    setDialog(!showDialog);
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    if (sortOrder === false) {
      return nameA > nameB ? 1 : -1;
    } else {
      return nameA < nameB ? 1 : -1;
    }
  });

  const filteredEmployees = sortedEmployees.filter(
    (profile) =>
      profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className={` ${!showDialog ? "hidden" : ""} `}>
        {showDialog && <InviteComponent hideDialog={handleClickInvite} />}
      </div>
      <BannerComponent />
      <div className="relative mb-4 mx-auto w-[80vw] flex items-center md:flex-row flex-col gap-9">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <PrimaryButton size="small" onClick={handleClickInvite}>
          <span>Invitar Trabajador</span>
        </PrimaryButton>
      </div>
      <div className="justify-center w-[80vw] mx-auto text-third text-lg">
        <strong>Directorio de trabajadores</strong>
      </div>
      <div className="mt-6 w-[80vw] mx-auto">
        <Table<Profile>
          data={filteredEmployees}
          columnNames={[
            <div className="flex gap-1 justify-center">
              <Filter
                label="Nombre"
                onClick={toggleSortOrder}
                showArrow={sortOrder}
                color="text-third"
              />
            </div>,
            "Cargo dentro de la empresa",
            "Acciones",
          ]}
          columnValues={[
            (profile) => {
              return (
                <div className="flex gap-1 items-center justify-center">
                  <img
                    src={profile.iconUrl}
                    alt="User Image"
                    className="size-10 rounded-full "
                  />
                  <span>
                    {profile.firstName} {profile.lastName}
                  </span>
                </div>
              );
            },
            (profile) => profile.role,
            (profile) => {
              return (
                <button
                  onClick={() =>
                    handleClick(
                      profile.firstName,
                      profile.lastName,
                      profile.role,
                      profile.iconUrl
                    )
                  }
                  className="p-3"
                >
                  <img src="/icons/dots.svg" alt="more" />
                </button>
              );
            },
          ]}
        />
        <div className={` ${!showSidebar ? "hidden" : ""} `}>
          {showSidebar && (
            <Sidebar hideSidebar={handleSidebar} userData={userData} />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

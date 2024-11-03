import {BaseLayout} from "@/shared/layouts/BaseLayout";
import {ReactElement} from "react";
import {MembershipCard} from "../components/MembershipCard";
import {Table} from "@/shared/components/Table";

const icons = {
  basic: "/icons/mushroom.svg",
  standard: "/icons/mushroom.svg",
  premium: "/icons/mushroom.svg",
};

const checkIcon = (
  <img
    src="/icons/excelent_icon.svg"
    alt="Included"
    className="w-5 h-5 mx-auto"
  />
);

const membershipData = [
  {
    feature: "Precio",
    basic: "S/. 0 al mes",
    standard: "S/. 10 al mes",
    premium: "S/. 20 al mes",
  },
  {
    feature: "Funcionalidades básicas",
    basic: checkIcon,
    standard: checkIcon,
    premium: checkIcon,
  },
  {
    feature: "Reportes estadísticos",
    basic: checkIcon,
    standard: checkIcon,
    premium: checkIcon,
  },
  {
    feature: "Usuarios",
    basic: "5",
    standard: "15",
    premium: "Ilimitados",
  },
  {
    feature: "Cultivos",
    basic: "5",
    standard: "Ilimitados",
    premium: "Ilimitados",
  },
  {
    feature: "Registros por fase de cultivo",
    basic: "50",
    standard: "Ilimitados",
    premium: "Ilimitados",
  },
];

const columnNames = [
  "Funcionalidades y precio",
  "Plan básico",
  "Plan estándar",
  "Plan premium",
];

const columnValues = [
  (row: (typeof membershipData)[0]) => row.feature,
  (row: (typeof membershipData)[0]) => row.basic,
  (row: (typeof membershipData)[0]) => row.standard,
  (row: (typeof membershipData)[0]) => row.premium,
];

export const MembershipsPage = (): ReactElement => {
  const membershipPlans = [
    {
      id: "1",
      name: "Básico",
      price: "0",
      description: "Plan básico para pequeñas empresas.",
      icon: icons.basic,
    },
    {
      id: "2",
      name: "Estándar",
      price: "10",
      description: "Plan regular con más características y soporte extendido.",
      icon: icons.standard,
    },
    {
      id: "3",
      name: "Premium",
      price: "20",
      description:
        "Plan premium para grandes empresas con todas las funcionalidades.",
      icon: icons.premium,
    },
  ];

  return (
    <BaseLayout>
      <div className="w-full flex flex-col justify-center items-center p-8 pt-0 lg:pl-0 lg:pt-12">
        <div className="w-full max-w-screen-lg flex flex-col items-center md:items-start mb-8">
          <p className="text-2xl text-center lg:text-left">
            ¡Bienvenid@ a Greenhouse!
          </p>
          <h1 className="text-4xl text-primary mb-3 text-center lg:text-left">
            Selecciona tu plan
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg">
          {membershipPlans.map((plan) => (
            <MembershipCard
              key={plan.id}
              membershipName={plan.name}
              price={plan.price}
              description={plan.description}
              icon={plan.icon}
            />
          ))}
        </div>

        <div className="mt-12 w-full max-w-screen-lg">
          <Table
            data={membershipData}
            columnNames={columnNames}
            columnValues={columnValues}
            headerStyle={{}}
            bodyStyle={{}}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

import { ReactElement, useEffect, useState } from "react";
import { CardButton } from "@/public/components";
import { getRecentRecords } from "@/public/services/crops.service";
import { Crop, CropWrapper } from "@/public/models/Crop";
import { Table } from "@/shared/components/Table/Table.tsx";
import { BaseLayout } from "@/shared/layouts/BaseLayout";
import { LoaderMessage } from "@/shared/components/LoaderMessage";

export const HomePage = (): ReactElement => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecentRecords();
      if (result.status === "success") {
        const data = result.data as unknown as CropWrapper;
        setCrops(data.crops || []);
        setError(null);
      } else {
        setError(result.data as string);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    <BaseLayout>
      <div className="flex justify-center items-center h-full">
        <LoaderMessage message="Cargando..." />
      </div>
    </BaseLayout>
  }

  if (error) {
    <BaseLayout>
      <div className="flex justify-center items-center h-full">
        <LoaderMessage message="Error al cargar el dashboard" />
      </div>
    </BaseLayout>
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-12 max-w-full h-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-center">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw] mt-6 justify-center mx-auto">
          <CardButton
            image="/public/crops_in_progress.webp"
            title="Cultivos en Progreso"
            link="/crops"
          />
          <CardButton
            image="/public/crops_archive.webp"
            title="Cultivos Finalizados"
            link="/archive"
          />
          <CardButton
            image="/public/company.webp"
            title="Mi Empresa"
            link="/company"
          />
        </div>
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
            Registros Recientes
          </h2>
          <div className="flex justify-center items-center overflow-x-auto">
            <Table<Crop>
              data={crops}
              columnNames={[
                "Crop ID",
                "Author",
                "State",
                "Phase",
                "Start Date",
              ]}
              columnValues={[
                (crop) => crop.id,
                (crop) => crop.author,
                (crop) => (crop.state ? "Active" : "Inactive"),
                (crop) => crop.phase,
                (crop) => new Date(crop.startDate).toLocaleDateString(),
              ]}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

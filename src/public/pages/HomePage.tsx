import { ReactElement, useEffect, useState } from "react";
import { CardButton } from "@/public/components";
import { getRecentRecords } from "@/public/services/recent-records.service";
import { Crop, CropWrapper } from "@/public/models/Crop";
import { Table } from "@/shared/components/Table/Table.tsx";

export const HomePage = (): ReactElement => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecentRecords();
      if (result.status === 'success') {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="grid grid-rows-[auto_1fr] bg-light min-h-screen">
        <div className="flex justify-between items-center p-4 sm:p-6 lg:p-12 lg:pb-1">
          <div className="flex justify-center items-center text-primary hover:scale-95 transition-transform duration-300 gap-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <p className="font-bold text-2xl">Greenhouse</p>
          </div>
          <svg
              className="w-7 h-7 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.0}
              stroke="currentColor"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </div>
        <main className="p-4 sm:p-6 lg:p-12">
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-12 max-w-full h-full mt-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-center">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[80vw] mt-6 justify-center mx-auto">
              <CardButton image="/public/crops_in_progress.webp" title="Cultivos en progreso" link="/link1" />
              <CardButton image="/public/company.webp" title="Mi Empresa" link="/link2" />
              <CardButton image="/public/statistical_reports.webp" title="Reportes Estadísticos" link="/link3" />
              <CardButton image="/public/crops_archive.webp" title="Histórico de Cultivos" link="/link4" />
            </div>
            <div className="mt-14">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">Recent Records</h2>
              <div className="flex justify-center items-center overflow-x-auto">
                <Table<Crop>
                    data={crops}
                    columnNames={['Name', 'Author', 'State', 'Phase', 'Start Date']}
                    columnValues={[
                      (crop) => crop.name,
                      (crop) => crop.author,
                      (crop) => (crop.state ? 'Active' : 'Inactive'),
                      (crop) => crop.phase,
                      (crop) => new Date(crop.startDate).toLocaleDateString(),
                    ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

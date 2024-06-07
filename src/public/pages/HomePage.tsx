import { ReactElement, useEffect, useState } from "react";
import { CardButton } from "@/public/components";
import { getRecentRecords } from "@/public/services/recent-records.service";
import {Crop, CropWrapper} from "@/public/models/Crop";
import { Table } from "@/shared/components/Table/Table.tsx";

export const HomePage = (): ReactElement => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecentRecords();
      if (result.status === 'success') {
        const data = result.data as unknown as CropWrapper; // Adjust type to match response structure
        setCrops(data.crops || []);
        setError(null);
      } else {
        setError(result.data as string);
      }
      setLoading(false);
    };
    fetchData().then(r => r);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="grid grid-rows-[auto_1fr] bg-light min-h-dvh">
        <div className="flex justify-between items-center p-6 lg:p-12 lg:pb-1">
          <div className="flex justify-center items-center text-primary hover:scale-95 duration-300 gap-1">
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
        <main className="p-6 lg:p-12">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-full h-full mt-2">
            <h2 className="text-4xl font-bold mb-1 text-center">Dashboard</h2>
            <div className="flex flex-col justify-center items-center h-fit pt-14 lg:flex-row lg:justify-around space-x-4 lg:space-x-8">
              <CardButton image="public/mushrooms.webp" title="Title 1" link="/link1" />
              <CardButton image="public/mushrooms.webp" title="Title 2" link="/link2" />
              <CardButton image="public/mushrooms.webp" title="Title 3" link="/link3" />
              <CardButton image="public/mushrooms.webp" title="Title 4" link="/link4" />
            </div>
            <div className="mt-14">
              <h2 className="text-2xl font-bold mb-4 text-center">Recent Records</h2>
              <Table<Crop>
                  data={crops}
                  columnNames={['ID', 'Name', 'Author', 'State', 'Phase', 'Start Date']}
                  columnValues={[
                    (crop) => crop.id,
                    (crop) => crop.name,
                    (crop) => crop.author,
                    (crop) => crop.state ? 'Active' : 'Inactive',
                    (crop) => crop.phase,
                    (crop) => new Date(crop.startDate).toLocaleDateString(),
                  ]}
              />
            </div>
          </div>
        </main>
      </div>
  );
};
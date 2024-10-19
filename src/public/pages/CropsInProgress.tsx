import { ReactElement, useEffect, useState } from "react";
import { getRecentRecords, createNewCrop } from "@/public/services/crops.service";
import { Crop, CropWrapper } from "@/public/models/Crop";
import { BaseLayout } from "@/shared/layouts/BaseLayout";
import { LoaderMessage } from "@/shared/components/LoaderMessage";
import { CropCard } from "@/crops/components/CropCard";
import { NewCropDialog } from "@/crops/components/NewCropDialog"; // Importa el componente del diálogo
import { useAuthStore } from "@/auth/stores/useAuthStore";
import { BannerComponent } from "@/shared/components/Banner";

export const CropsInProgress = (): ReactElement => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  const { profile } = useAuthStore();

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

  const handleNewCrop = async () => {
    if (!profile) return;

    const result = await createNewCrop("Nuevo Cultivo", `${profile.firstName} ${profile.lastName}`);
    if (result.status === "success") {
      setCrops((prevCrops) => [...prevCrops, result.data as Crop]);
      setIsDialogOpen(false);
    } else {
      console.error("Error creating new crop:", result.message);
    }
  };

  const filteredCrops = crops.filter(
    (crop) =>
      crop.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.phase.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <BaseLayout>
        <div className="flex justify-center items-center h-full">
          <LoaderMessage message="Cargando la lista de cultivos en progreso." />
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="flex justify-center items-center h-full">
          <LoaderMessage message="No se encontraron cultivos en progreso." />
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <BannerComponent/>
      <div className="max-w-full h-full">
        <div className="relative mb-4 mx-auto w-[80vw] flex items-center">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-6 pl-10 p-2 border rounded w-full mx-auto focus:outline-none focus:ring focus:current-color transition duration-300 ease-in-out"
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-[80vw] mt-6 justify-center mx-auto">
          {filteredCrops.map((crop) => (
            <CropCard
              key={crop.id}
              cropId={crop.id}
              startDate={crop.startDate}
              phase={crop.phase}
            />
          ))}
        </div>
      </div>
      <NewCropDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleNewCrop}
      />
    </BaseLayout>
  );
};

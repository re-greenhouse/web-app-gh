import { ReactElement, useEffect, useState } from "react";
import { getRecentRecords } from "@/public/services/crops.service";
import { Crop, CropWrapper } from "@/public/models/Crop";
import { BaseLayout } from "@/shared/layouts/BaseLayout";
import { LoaderMessage } from "@/shared/components/LoaderMessage";
import { CropCard } from "@/crops/components/CropCard";
import { useAuthStore } from "@/auth/stores/useAuthStore";
import { BannerComponent } from "@/shared/components/Banner";
import { Dropdown } from "@/shared/components/DropDownComponent";

export const CropsInProgress = (): ReactElement => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [openPhaseFilter, setOpenPhaseFilter] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Todos')

  const options = ["Todos", "Formula", "Preparation Area", "Bunker", "Tunnel", "Incubation", "Casing", "Induction", "Harvest"];

  const toggleDateSorting = () => {
    setOpenDateFilter(!openDateFilter);
  }

  const handleItemClick = (option: string) => {
    setSelectedOption(option);
    setDropdown(false);
  }
  
  const { profile } = useAuthStore();

  const filteredCrops = crops.filter(
    (crop) =>
      crop.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.phase.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(
    crop => crop.state && (selectedOption === 'Todos' || crop.phase.toLowerCase() === selectedOption.toLowerCase())
  );

  const sortedCrops = filteredCrops
      .sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return openDateFilter ? dateA- dateB : dateB - dateA;
      });

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
      <div className="max-w-full h-auto">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-6 pl-10 p-2 border rounded w-full mx-auto focus:outline-none focus:ring focus:current-color transition duration-300 ease-in-out"
              />
            </div>
            <div className="flex ">
              <button
                  className="inline-flex items-center px-4 text-secondary gap-2 whitespace-nowrap"
                  onClick={toggleDateSorting}
              >
                Fecha de inicio
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-4 ${openDateFilter ? "rotate-180" : ""} duration-200`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
              </button>
              <button
                  className="flex items-center px-4 text-secondary gap-2 whitespace-nowrap"
                  onClick={()=>{setOpenPhaseFilter(!openPhaseFilter), setDropdown(!dropdown)}}
              >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2.5C4.44772 2.5 4 2.94772 4 3.5V5.50001H20V3.5C20 2.94772 19.5523 2.5 19 2.5H5ZM19.7822 7.50001H4.21776C4.3321 7.72455 4.48907 7.92794 4.68299 8.09762L10.683 13.3476C11.437 14.0074 12.563 14.0074 13.317 13.3476L19.317 8.09762C19.5109 7.92794 19.6679 7.72455 19.7822 7.50001Z" fill="#898989"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 17.2049L14 10.5H10V19.2049L14 17.2049Z" fill="#898989"/>
                </svg>
                Fase actual
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-4 ${openPhaseFilter ? "rotate-180" : ""} duration-200`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
                {dropdown && (
                  <div className="absolute translate-y-4">
                    <Dropdown options={options} onOptionSelect={handleItemClick}/>
                  </div>
                )}
              </button>
            </div>
            
        </div>
        <div className="justify-center w-[80vw] mx-auto text-third text-lg">
          <strong>
            Cultivos
          </strong>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-[80vw] mt-6 justify-center mx-auto">
          {sortedCrops.map((crop) => (
            <CropCard
              key={crop.id}
              cropId={crop.id}
              startDate={crop.startDate}
              phase={crop.phase}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

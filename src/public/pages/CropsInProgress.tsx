import { ReactElement, useEffect, useState } from "react";
import { getCrops } from "@/public/services/crops.service";
import { Crop, CropWrapper } from "@/public/models/Crop";
import { BaseLayout } from "@/shared/layouts/BaseLayout";
import { LoaderMessage } from "@/shared/components/LoaderMessage";
import { CropCard } from "@/crops/components/CropCard";
import { BannerComponent } from "@/shared/components/Banner";
import { Dropdown } from "@/shared/components/DropDownComponent";
import { DeleteDialog } from "@/shared/components/DeleteDialog";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { SearchBar } from "@/shared/components/SearchBar";
import { Filter } from "@/shared/components/Filter";

export const CropsInProgress = (): ReactElement => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [openPhaseFilter, setOpenPhaseFilter] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Todos");
  
  const { company } = useCompanyPage();

  const options = [
    "Todos",
    "Formula",
    "Preparation Area",
    "Bunker",
    "Tunnel",
    "Incubation",
    "Casing",
    "Induction",
    "Harvest",
  ];

  const toggleDateSorting = () => {
    setOpenDateFilter(!openDateFilter);
  };

  const handleItemClick = (option: string) => {
    setSelectedOption(option);
    setDropdown(false);
  };

  const filteredCrops = crops
    .filter(
      (crop) =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.phase.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (crop) =>
        crop.state &&
        (selectedOption === "Todos" ||
          crop.phase.toLowerCase() === selectedOption.toLowerCase())
    );

  const sortedCrops = filteredCrops.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return openDateFilter ? dateA - dateB : dateB - dateA;
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCrops(company?.id);
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
  }, [company]);

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
      <BannerComponent />
      <div className="max-w-full h-auto">
        <div className="relative mb-4 mx-auto w-[80vw] flex items-center md:flex-row flex-col gap-9">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Filter
            label="Fecha de inicio"
            onClick={toggleDateSorting}
            leadingIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 20L7.29289 20.7071L8 21.4142L8.70711 20.7071L8 20ZM10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3L10 5ZM3.29289 16.7071L7.29289 20.7071L8.70711 19.2929L4.70711 15.2929L3.29289 16.7071ZM8.70711 20.7071L12.7071 16.7071L11.2929 15.2929L7.29289 19.2929L8.70711 20.7071ZM9 20L9 6L7 6L7 20L9 20ZM9 6C9 5.44772 9.44771 5 10 5L10 3C8.34315 3 7 4.34315 7 6L9 6Z" fill="#33363F"/>
              <path d="M16 4L15.2929 3.29289L16 2.58579L16.7071 3.29289L16 4ZM16 19L17 19L17 19L16 19ZM14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20L14 22ZM11.2929 7.29289L15.2929 3.29289L16.7071 4.70711L12.7071 8.70711L11.2929 7.29289ZM16.7071 3.29289L20.7071 7.29289L19.2929 8.70711L15.2929 4.70711L16.7071 3.29289ZM17 4L17 19L15 19L15 4L17 4ZM17 19C17 20.6569 15.6569 22 14 22L14 20C14.5523 20 15 19.5523 15 19L17 19Z" fill="#33363F"/>
              </svg>}
          />
          <div className="relative">
            <Filter
              label="Fase actual"
              leadingIcon={<img
                src="/icons/downArrow.svg"
                alt="arrow"
                className={`w-4 h-4 transition-transform duration-300`}
              />}
              onClick={() => {
                setOpenPhaseFilter(!openPhaseFilter), setDropdown(!dropdown);
              }}
            />
            {dropdown && (
              <div className="absolute translate-y-4">
                <Dropdown options={options} onOptionSelect={handleItemClick} />
              </div>
            )}
          </div>
        </div>
        <div className="justify-center w-[80vw] mx-auto text-third text-lg">
          <strong>Cultivos</strong>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-[80vw] mt-6 justify-center mx-auto">
          {sortedCrops.length > 0 ? (
            sortedCrops.map((crop) => (
              <CropCard
                key={crop.id}
                cropId={crop.id}
                cropName={crop.name}
                startDate={crop.startDate}
                phase={crop.phase}
              />
            ))
          ) : (
            <p className="text-center text-secondary">
              No hay cultivos en progreso actualmente.
            </p>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

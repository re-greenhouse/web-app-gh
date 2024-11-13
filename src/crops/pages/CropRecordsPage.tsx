import { BaseLayout } from "@/shared/layouts/BaseLayout";
import { ReactElement, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecordCard } from "../components/RecordCard";
import { LoaderMessage } from "@/shared/components/LoaderMessage";
import { Record } from "../models/Record";
import { getRecordsByCropIdAndPhase } from "../services/records.service";
import { PrimaryButton } from "@/shared/components/Buttons";
import { Stepper } from "../components/Stepper";
import { Dropdown } from "@/shared/components/DropDownComponent";
import { Filter } from "@/shared/components/Filter";
import { SearchBar } from "@/shared/components/SearchBar";
import { RecordChart } from "../components/RecordChart";
import * as XLSX from "xlsx";

export const CropsRecordsPage = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { cropId, cropPhase } = useParams<{
    cropId: string;
    cropPhase: string;
  }>();
  const [records, setRecords] = useState<Record[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [showAuthorDropdown, setShowAuthorDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  const steps = {
    Fórmula: "formula",
    Patio: "preparation_area",
    Búnker: "bunker",
    Túnel: "tunnel",
    Incubación: "incubation",
    Cobertura: "casing",
    Inducción: "induction",
    Cosecha: "harvest",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!cropId || !cropPhase) {
        setError("Falta información del cultivo o la fase.");
        setLoading(false);
        return;
      }

      try {
        const result = await getRecordsByCropIdAndPhase(cropId, cropPhase);
        if (result.status === "success") {
          if (Array.isArray(result.data)) {
            setRecords(result.data);
            setError(null);
          } else {
            setError("No hay registros disponibles para esta fase.");
          }
        } else {
          setError(result.data as string);
        }
      } catch (error) {
        setError("Error al cargar los datos. Por favor, intente nuevamente.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cropId, cropPhase]);

  const handleBack = () => {
    navigate("/");
  };

  const authors = Array.from(new Set(records.map((record) => record.author)));

  const filteredRecords = records
    .filter(
      (record) =>
        record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.updatedDate.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((record) =>
      selectedAuthor ? record.author === selectedAuthor : true
    );

  const exportToExcel = () => {
    const dataToExport = filteredRecords.map((record) => {
      const baseData: { [key: string]: string | number } = {
        "Record ID": record.id,
        Author: record.author,
        "Updated Date": record.updatedDate,
      };

      record.payload.data.forEach((item: { name: string; value: any }) => {
        baseData[item.name] = item.value;
      });

      return baseData;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Records");

    XLSX.writeFile(workbook, `Records_Crop_${cropId}_Phase_${cropPhase}.xlsx`);
  };

  if (loading) {
    return (
      <BaseLayout>
        <div className="flex justify-center items-center h-full">
          <LoaderMessage message="Cargando los registros para la fase seleccionada" />
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="flex flex-col mx-auto justify-center items-center h-full gap-4">
          <p>{error}</p>
          <PrimaryButton size="small" onClick={handleBack}>
            <span>Regresar</span>
          </PrimaryButton>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="relative">
        <img
          src="/images/cropRecordBanner.webp"
          alt="bannerImage"
          className="w-full min-h-6"
        />
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 md:px-12">
          <Stepper
            steps={steps}
            currentStep={cropPhase ?? ""}
            cropId={cropId ?? ""}
          />
        </div>
      </div>

      <div className="px-4 md:px-12 mt-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-third text-center md:text-left overflow-ellipsis">
          Registros del cultivo #{cropId}
        </h1>
        <h2 className="text-base sm:text-xs md:text-sm lg:text-lg text-center md:text-left text-secondary">
          Mostrando registros de la fase {cropPhase}
        </h2>

        <section className="max-w-full relative my-4 mx-auto w-[80vw] mt-8">
          <RecordChart records={filteredRecords} />
          <div className="flex items-center md:flex-row flex-col gap-9 my-6">
            <div className="w-[80vw]">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter
                label="Autor"
                onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                leadingIcon="/icons/filterIcon.svg"
                trailingIcon="/icons/downArrow.svg"
                clickedState={showAuthorDropdown}
              />
              {showAuthorDropdown && (
                <div className="absolute mt-2 bg-white z-10 shadow-lg rounded w-44">
                  <Dropdown
                    options={["Todos", ...authors]}
                    onOptionSelect={(option) => {
                      setSelectedAuthor(option === "Todos" ? "" : option);
                      setShowAuthorDropdown(false);
                    }}
                  />
                </div>
              )}
            </div>
            <PrimaryButton size="small" onClick={exportToExcel}>
              <span>Descargar registros</span>
            </PrimaryButton>
          </div>

          <h3 className="text-xl text-third font-bold">Registros</h3>
          <div className="flex flex-col items-center justify-center gap-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <RecordCard
                  key={record.id}
                  recordId={record.id}
                  updatedDate={record.updatedDate}
                  author={record.author}
                  payload={JSON.stringify(record.payload)}
                />
              ))
            ) : (
              <p>No hay registros disponibles para esta fase.</p>
            )}
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};

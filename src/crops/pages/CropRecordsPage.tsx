import { BaseLayout } from "@/shared/layouts/BaseLayout";
import { ReactElement, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecordCard } from "../components/RecordCard";
import { LoaderMessage } from "@/shared/components/LoaderMessage";
import { Record } from "../models/Record";
import { getRecordsByCropIdAndPhase } from "../services/records.service";
import { PrimaryButton } from "@/shared/components/Buttons";
import { Stepper } from "../components/Stepper";

export const CropsRecordsPage = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { cropId, cropPhase } = useParams<{
    cropId: string;
    cropPhase: string;
  }>();
  const [records, setRecords] = useState<Record[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const steps = [
    "Fórmula",
    "Patio",
    "Búnker",
    "Túnel",
    "Incubación",
    "Cobertura",
    "Inducción",
    "Cosecha",
  ];
  const phaseToRoute = {
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

  const filteredRecords = records.filter(
    (record) =>
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.updatedDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-col mx-auto justify-center items-center h-full  gap-4">
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
          src="/public/images/cropRecordBanner.webp"
          alt="bannerImage"
          className="w-full min-h-6"
        />
        <div className="absolute inset-x-0 top-1/3 md:top-1/2 transform -translate-y-1/2 md:px-12">
          <Stepper
            steps={steps}
            currentStep={cropPhase ?? ""}
            phaseToRoute={phaseToRoute}
            cropId={cropId ?? ""}
          />
        </div>
      </div>
      <div className="md:px-12 mt-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-third overflow-ellipsis">
          Registros del cultivo #{cropId}
        </h1>
        <h2 className="text-base sm:text-xs md:text-sm lg:text-lg text-secondary">
          Mostrando registros de la fase
        </h2>

        <div className="max-w-full relative my-4 mx-auto w-[80vw]">
          <div className="flex items-center md:flex-row flex-col md:gap-0 gap-9 mb-6">
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
                placeholder="Buscar registros"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-6 pl-10 p-2 border rounded w-full mx-auto focus:outline-none focus:ring focus:current-color transition duration-300 ease-in-out"
              />
            </div>
            <div className="flex ">
              <button className="inline-flex items-center px-4 text-secondary gap-2 whitespace-nowrap">
                Fecha de inicio
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <button className="flex items-center px-4 text-secondary gap-2 whitespace-nowrap">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 2.5C4.44772 2.5 4 2.94772 4 3.5V5.50001H20V3.5C20 2.94772 19.5523 2.5 19 2.5H5ZM19.7822 7.50001H4.21776C4.3321 7.72455 4.48907 7.92794 4.68299 8.09762L10.683 13.3476C11.437 14.0074 12.563 14.0074 13.317 13.3476L19.317 8.09762C19.5109 7.92794 19.6679 7.72455 19.7822 7.50001Z"
                    fill="#898989"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 17.2049L14 10.5H10V19.2049L14 17.2049Z"
                    fill="#898989"
                  />
                </svg>
                Autor
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <h3 className="text-xl text-third font-bold">Registros</h3>
          <div className="flex flex-col items-center justify-center">
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
        </div>
      </div>
    </BaseLayout>
  );
};

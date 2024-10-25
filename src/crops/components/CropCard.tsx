import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "@/shared/components/DropDownComponent";

type CropCardProps = {
  cropId: string;
  cropName: string;
  startDate: string;
  phase: string;
};

export const CropCard = ({
  cropId,
  cropName,
  startDate,
  phase,
}: CropCardProps): ReactElement => {
  const navigate = useNavigate();
  const capitalize = (s: string | any[]) =>
    s && s[0].toUpperCase() + s.slice(1);
  const [dropdown, setDropdown] = useState(false);

  const options = ["Editar", "Eliminar"];

  const handleItemClick = (option: string) => {
    //TO-DO: Implementar lógica para editar o eliminar un cultivo
    console.log("Opción seleccionada:", option);
  };

  return (
    <div
      onClick={() => navigate(`/records/${cropId}/${phase}`)}
      className="flex flex-col cursor-pointer bg-white border-2 rounded-lg overflow-hidden"
    >
      <div className="w-full overflow-hidden pb-4">
        <img
          className="object-cover w-full h-1/2 mb-4"
          src="/mushroom_images/hongos2.webp"
          alt={cropId}
        />
        <div className="flex flex-col justify-center align-middle px-6 flex-grow space-y-4">
          <div className="flex">
            <h4 className="overflow-hidden w-full">Crop Name: {cropName}</h4>
            <div>
              <button
                id="dropdownDefaultButton"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setDropdown(!dropdown);
                }}
                className="p-3"
              >
                <svg
                  width="5"
                  height="16"
                  viewBox="0 0 5 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="2.33301"
                    cy="2"
                    r="2"
                    transform="rotate(-90 2.33301 2)"
                    fill="#898989"
                  />
                  <circle
                    cx="2.33301"
                    cy="8"
                    r="2"
                    transform="rotate(-90 2.33301 8)"
                    fill="#898989"
                  />
                  <circle
                    cx="2.33301"
                    cy="14"
                    r="2"
                    transform="rotate(-90 2.33301 14)"
                    fill="#898989"
                  />
                </svg>
              </button>
              {dropdown && (
                <Dropdown options={options} onOptionSelect={handleItemClick} />
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="flex items-center gap-2">
              <img src="/icons/calendar.svg" alt="calendar" />
              <strong className="text-sm text-primary">
                Fecha de inicio:{" "}
              </strong>
              <h2 className="text-xs text-secondary">{startDate}</h2>
            </span>
            <span className="flex items-center gap-2">
              <img src="/icons/mushroom.svg" alt="mushroom" />
              <strong className="text-sm text-primary">Fase actual: </strong>
              <h2 className="text-xs text-secondary">{capitalize(phase)}</h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

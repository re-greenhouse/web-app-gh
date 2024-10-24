import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "@/shared/components/DropDownComponent";

type CropCardProps = { cropId: string; startDate: string; phase: string };

export const CropCard = ({
  cropId,
  startDate,
  phase,
}: CropCardProps): ReactElement => {
  const navigate = useNavigate();
  const capitalize = (s: string | any[]) =>
    s && s[0].toUpperCase() + s.slice(1);
  const [dropdown, setDropdown] = useState(false);

  const options = ["Editar", "Eliminar"];

  const handleItemClick = (option: string) => {
    console.log("Opción seleccionada:", option);
  };

  return (
    <div
      onClick={() => navigate(`/records/${cropId}/${phase}`)}
      className="flex flex-col cursor-pointer bg-white border-2 rounded-lg overflow-hidden m-2 sm:m-4"
    >
      <div className="w-full overflow-hidden pb-4">
        <img
          className="object-cover w-full h-1/2 mb-4"
          src="/public/mushroom_images/hongos2.webp"
          alt={cropId}
        />
        <div className="flex flex-col justify-center align-middle px-6 flex-grow space-y-4">
          <div className="flex">
            <h4>Crop ID: #{cropId}</h4>
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
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V8H16V18ZM16 6H2V4H16V6ZM9 11H14V16H9V11Z"
                  fill="#465B3F"
                />
              </svg>
              <strong className="text-sm text-primary">
                Fecha de inicio:{" "}
              </strong>
              <h2 className="text-xs text-secondary">{startDate}</h2>
            </span>
            <span className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4203 12.2626C14.0687 12.342 14.7178 12.4079 15.3019 12.4258L15.3135 12.4262H15.325C15.3807 12.4262 15.4366 12.4285 15.5084 12.4318L15.5179 12.4322C15.5831 12.4352 15.6654 12.4389 15.75 12.4389C17.6156 12.4389 18.75 10.7398 18.75 8.85714C18.75 7.51429 18.2853 5.61868 16.9422 4.04622C15.5758 2.44656 13.3586 1.25 10 1.25C6.64145 1.25 4.4244 2.44654 3.05811 4.04432C1.71509 5.61489 1.25 7.5073 1.25 8.84445C1.25 10.7271 2.38442 12.4262 4.25 12.4262H4.26017C4.38847 12.4262 4.55917 12.4262 4.73572 12.4121C5.2997 12.3855 5.91895 12.3255 6.54318 12.2514C6.44918 12.6979 6.32405 13.2523 6.15903 13.9359C5.82421 15.2846 5.87584 16.5455 6.59718 17.4595C7.31728 18.3848 8.53989 18.75 9.9625 18.75H10C11.424 18.75 12.6477 18.3841 13.3675 17.4567L13.3687 17.4552C14.0721 16.544 14.1262 15.288 13.8045 13.9402L13.8045 13.9402L13.8037 13.9367C13.6393 13.2626 13.5144 12.7091 13.4203 12.2626Z"
                  stroke="#4C6444"
                  stroke-width="1.5"
                />
              </svg>
              <strong className="text-sm text-primary">Fase actual: </strong>
              <h2 className="text-xs text-secondary">{capitalize(phase)}</h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

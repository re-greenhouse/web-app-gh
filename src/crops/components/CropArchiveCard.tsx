import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "@/shared/components/DropDownComponent";


type CropArchiveCardProps = { cropId: string; startDate: string; quality: string };

export const CropArchiveCard = ({ cropId, startDate, quality }: CropArchiveCardProps): ReactElement => {
  const navigate = useNavigate();
  const capitalize = (s: string | any[]) => s && s[0].toUpperCase() + s.slice(1);
  const [dropdown, setDropdown] = useState(false);

  const options = ['Editar', 'Eliminar']

  const handleItemClick = (option: string) => {
    console.log('Opcion seleccionada:',option)
  }

  const getIconAndColor = () => {
    switch (quality) {
        case "excelente":
          return {icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 10.1666 20.4518 8.46124 19.5103 7.03891L12.355 14.9893C11.6624 15.7589 10.4968 15.8726 9.66844 15.2513L6.4 12.8C5.95817 12.4686 5.86863 11.8418 6.2 11.4C6.53137 10.9582 7.15817 10.8686 7.6 11.2L10.8684 13.6513L18.214 5.48955C16.5986 3.94717 14.4099 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#465B3F"/>
        </svg>, color: 'text-textCardColorE'};
        case "regular":
          return {icon: <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33301 18C14.3036 18 18.333 13.9706 18.333 9C18.333 4.02944 14.3036 0 9.33301 0C4.36244 0 0.333008 4.02944 0.333008 9C0.333008 13.9706 4.36244 18 9.33301 18ZM4 8C3.44772 8 3 8.44771 3 9C3 9.55228 3.44772 10 4 10L15 10C15.5523 10 16 9.55229 16 9C16 8.44772 15.5523 8 15 8L4 8Z" fill="#282A3F"/>
            </svg>, color: 'text-textCardColorR'};
        case "mala":
          return {icon: <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33301 18C14.3036 18 18.333 13.9706 18.333 9C18.333 4.02944 14.3036 0 9.33301 0C4.36244 0 0.333008 4.02944 0.333008 9C0.333008 13.9706 4.36244 18 9.33301 18ZM4 8C3.44772 8 3 8.44771 3 9C3 9.55228 3.44772 10 4 10L15 10C15.5523 10 16 9.55229 16 9C16 8.44772 15.5523 8 15 8L4 8Z" fill="#DE4F4F"/>
            </svg>, color: 'text-textCardColorM'};
        default:
          return <span>{quality}</span>;
      }
  }

  const { icon, color } = getIconAndColor();

  return (
    <div
      onClick={() => navigate(cropId)}
      className="flex flex-col cursor-pointer bg-white border-2 rounded-lg overflow-hidden m-2 sm:m-4"
    >
      <div className="w-full overflow-hidden pb-4">
        <img className="object-cover w-full h-1/2 mb-4" src="/public/mushroom_images/hongos2.webp" alt={cropId} />
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
              <svg width="5" height="16" viewBox="0 0 5 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.33301" cy="2" r="2" transform="rotate(-90 2.33301 2)" fill="#898989" />
                <circle cx="2.33301" cy="8" r="2" transform="rotate(-90 2.33301 8)" fill="#898989" />
                <circle cx="2.33301" cy="14" r="2" transform="rotate(-90 2.33301 14)" fill="#898989" />
              </svg>
            </button>
            {dropdown && (
              <Dropdown options={options} onOptionSelect={handleItemClick}/>
            )}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="flex items-center gap-2">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V8H16V18ZM16 6H2V4H16V6ZM9 11H14V16H9V11Z" fill="#465B3F"/>
              </svg>
              <strong className="text-sm text-primary">Fecha de inicio: </strong>
              <h2 className="text-xs text-secondary">{startDate}</h2>
            </span>
            <span className="flex items-center gap-2">
                {icon}
                <strong className={`text-sm ${color}`}>Calidad: </strong>
                <h2 className={`text-xs ${color}`}>{capitalize(quality)}</h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

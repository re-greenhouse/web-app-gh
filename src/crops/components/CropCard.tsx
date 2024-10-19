import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type CropCardProps = {cropId: string; startDate: string; phase: string;};

export const CropCard = ({cropId, startDate, phase}: CropCardProps): ReactElement => {
  const navigate = useNavigate();
  const capitalize = (s: string | any[]) => s && s[0].toUpperCase() + s.slice(1);

  return (
    <div
      onClick={() => navigate(cropId)}
      className="flex flex-col cursor-pointer bg-white shadow-md rounded-lg overflow-hidden m-2 sm:m-4"
    >
      <div className="w-full overflow-hidden pb-4">
        <img className="object-cover w-full h-1/2 mb-4" src="/public/mushroom_images/hongos2.webp" alt={cropId} />
        <div className="flex flex-col justify-center align-middle px-6 flex-grow space-y-4">
            <h4>Crop ID: {cropId}</h4>
            <div className="flex flex-col space-y-2">
                <span className="flex items-center">
                    <img src="/public/icons/clock.svg" alt="Clock" className="mr-2" />
                    <strong className="mr-2">Start Date:</strong> {startDate}
                </span>
                <span className="flex items-center">
                    <img src="/public/icons/plant.svg" alt="Plant" className="mr-2" />
                    <strong className="mr-2">Current Phase:</strong> {capitalize(phase)}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

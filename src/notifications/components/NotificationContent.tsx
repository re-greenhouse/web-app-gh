import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { updateRecordPayload } from "@/crops/services/records.service";
import { PrimaryButton } from "@/shared/components/Buttons";

type NotificationContentProps = {
  cropID: string;
  phase: string;
  message: string;
  action: string;
  payload: Record<string, any>;
  recordId: string;
  differences: Record<string, any>;
  profileIcon: string;
};

export const NotificationContent = ({
  cropID,
  phase,
  message,
  action,
  payload,
  recordId,
  differences,
  profileIcon,
}: NotificationContentProps): ReactElement => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate(`/records/${cropID}/${phase}`);
  };

  const handleChange = () => {
    console.log(payload);
    updateRecordPayload(recordId, payload);
  };

  return (
    <div className="py-2">
      {action === "created" || action === "next" || action === "previous" ? (
        <div onClick={handleRoute} className="cursor-pointer">
          <div className="flex gap-2">
            <img
              src={profileIcon}
              alt="Foto de perfil"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="py-2">{message}</h1>
          </div>
          <a className="underline">Ver cambio</a>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            {profileIcon && (
              <img
                src={profileIcon}
                alt="Foto de perfil"
                className="w-12 h-12 rounded-full"
              />
            )}
            <h1 className="py-2">{message}</h1>
          </div>

          {Array.isArray(differences) && differences.length > 0 && (
            <div className="py-5">
              {differences.map((diff, index) => (
                <div className="mb-4" key={index}>
                  <span className="flex gap-2">
                    <p className="mr-2">{diff.name}:</p>
                    <p className="text-gray-400 line-through">{diff.before}</p>
                    <img src="icons/rightArrow.svg" alt="arrow" />
                    <p className="font-bold ">{diff.after}</p>
                  </span>
                </div>
              ))}
              <PrimaryButton onClick={handleChange} variant="primary">
                <p>Aplicar cambios</p>
              </PrimaryButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

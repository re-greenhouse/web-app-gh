import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { updateRecordPayload } from "@/crops/services/records.service";

type CropActionProps = {
  cropID: string;
  phase: string;
  message: string;
  action: string;
  payload: Record<string, any>;
  recordId: string;
  differences: Record<string, any>;
};

export const CropAction = ({
  cropID,
  phase,
  message,
  action,
  payload,
  recordId,
  differences,
}: CropActionProps): ReactElement => {
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
        <a onClick={handleRoute} className="cursor-pointer">
          <div className="flex flex-col">
            <h1 className="py-2">{message}</h1>
            <p className="text-gray-400">Cultivo #{cropID}</p>
          </div>
          <span className="underline py-2">Ver cambio</span>
        </a>
      ) : (
        <div>
          <div className="flex flex-col">
            <h1 className="py-2">{message}</h1>
            <p className="text-gray-400">Cultivo #{cropID}</p>
            <p className="text-gray-400">Registro #{recordId}</p>
          </div>

          {Array.isArray(differences) && differences.length > 0 && (
            <div className="py-5">
              <h1>Cambios:</h1>
              {differences.map((diff, index) => (
                <div key={index} className="py-2">
                  <p className="font-bold text-gray-400">
                    Campo de modificación: {diff.name}
                  </p>
                  <p className="font-bold text-gray-400">
                    Antes: {diff.before}
                  </p>
                  <p className="font-bold text-gray-400">
                    Después: {diff.after}
                  </p>
                </div>
              ))}
              <button
                onClick={handleChange}
                className="border p-2 rounded-lg hover:bg-white"
              >
                Confirmar cambio
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

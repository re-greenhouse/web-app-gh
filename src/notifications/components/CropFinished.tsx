import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { updateRecordPayload } from "@/crops/services/records.service"


type CropFinishedProps = {
    cropID: string;
    phase: string;
    message: string;
    action: string;
    payload: Record<string, any>;
    recordId: string;
    differences: Record<string, any>;
}

export const CropFinished = ({ cropID, phase, message, action, payload, recordId, differences }: CropFinishedProps): ReactElement => {
    const navigate = useNavigate();

    const handleRoute = () => {
        navigate(`/records/${cropID}/${phase}`);
    }
    const handleChange = () => {
        console.log(payload);
        updateRecordPayload(recordId, payload)
    }

    return (
        <div className="py-2">
            {
                (action === 'created' || action === 'next' || action === 'previous') ? (
                    <div>
                        <div className="flex flex-col">
                            <h1 className="py-2">{message}</h1>
                            <p className="">Cultivo #{cropID}</p>
                        </div>
                        <a onClick={handleRoute} className="underline py-2">Ver cambio</a>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col">
                            <h1 className="py-2">{message}</h1>
                            <p className="">Cultivo #{cropID}</p>
                            <p>Registro #{recordId}</p>
                        </div>
                        <div className="py-5">
                            <h1>Cambios:</h1>
                            {Array.isArray(differences) && differences.length > 0 ? (
                                differences.map((diff, index) => (
                                    <div key={index} className="py-2">
                                        <p><span className="font-bold">Campo de modificacion:</span> {diff.name}</p>
                                        <p><span className="font-bold">Antes:</span> {diff.before}</p>
                                        <p><span className="font-bold">Después:</span> {diff.after}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay diferencias disponibles</p>
                            )}
                        </div>
                        <a onClick={handleChange} className="border p-2 rounded-lg hover:bg-white">Confirmar cambio</a>
                    </div>
                )
            }
        </div>
    );
};

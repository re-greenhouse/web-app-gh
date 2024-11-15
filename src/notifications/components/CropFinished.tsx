import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type CropFinishedProps = {
    cropID: string;
    phase: string;
    message: string;
}
export const CropFinished = ({cropID, phase, message}: CropFinishedProps): ReactElement => {
    const navigate = useNavigate();

    const handleRoute = () => {
        navigate(`/records/${cropID}/${phase}`)
    }

    return (
        <div>
            <a onClick={handleRoute} className="hover:bg-slate-700">{message}</a>
        </div>
    );
}
import { ReactElement } from "react";
import { Spinner } from "@/shared/components/Spinner.tsx";

type LoaderMessageProps = {
  message: string;
  spinnerSize?: number | string;
  fontSize?: number | string;
  width?: number | string;
}

export const LoaderMessage = ({message, fontSize, spinnerSize, width}: LoaderMessageProps): ReactElement => {
  return (
    <div className="flex flex-col justify-center items-center w-fit space-y-2" style={{width: width ?? "16rem"}}>
      <Spinner height={spinnerSize ?? "2.5rem"} />
      <p className="text-center text-primary" style={{fontSize: fontSize ?? "1rem"}}>{message}</p>
    </div>
  );
}
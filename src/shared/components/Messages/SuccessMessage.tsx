import {ReactElement} from "react";

type InfoMessageProps = {
  text: string;
}

export const SuccessMessage = ({text}: InfoMessageProps): ReactElement => {
  return (
    <div className="bg-green-100 text-green-600 rounded-md px-2 py-1 w-fit">
      <svg className="inline-block w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
      </svg>
      <span className="ml-0.5 inline-block font-medium text-sm align-middle h-fit">{text}</span>
    </div>
  );
};
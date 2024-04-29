import {ReactElement} from "react";

type InfoMessageProps = {
  text: string;
}

export const InfoMessage = ({text}: InfoMessageProps): ReactElement => {
  return (
    <div className="bg-blue-200 text-blue-600 rounded-md px-2 py-1 w-fit">
      <svg className="inline-block w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
      </svg>
      <span className="ml-0.5 inline-block font-medium text-sm align-middle h-fit">{text}</span>
    </div>
  );
};
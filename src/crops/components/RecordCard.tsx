import { ReactElement, useState } from "react";

type RecordCardProps = {
  recordId: string;
  updatedDate: string;
  author: string;
  payload: string;
};

export const RecordCard = ({
  recordId,
  updatedDate,
  author,
  payload,
}: RecordCardProps): ReactElement => {
  const [showDetails, setShowDetails] = useState(false);
  const [toggleText, setToggleText] = useState("Mostrar detalles");

  let parsedPayload;
  try {
    parsedPayload = JSON.parse(payload);
  } catch (e) {
    parsedPayload = payload;
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setToggleText(showDetails ? "Mostrar detalles" : "Ocultar detalles");
  };

  return (
    <div className="flex flex-col bg-white border rounded-lg overflow-hidden p-4 shadow md:min-w-[660px]">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">Registro # {recordId}</h4>
        <button className="p-1">
          <img
            src="/public/icons/dots.svg"
            alt="more options"
            className="w-5 h-5"
          />
        </button>
      </div>
      <div className="flex items-center justify-between my-2">
        <p className="text-sm font-medium">Autor: {author}</p>
        <span className="flex">
          <img
            src="/public/icons/calendar.svg"
            alt="calendar icon"
            className="w-6 h-6"
          />
          <p className="text-sm">{updatedDate}</p>
        </span>
        <a
          href="#"
          onClick={toggleDetails}
          className="text-sm text-secondary underline cursor-pointer"
        >
          {toggleText}
        </a>
      </div>

      {showDetails && (
        <div>
          {parsedPayload?.data ? (
            parsedPayload.data.map(
              (item: { name: string; value: string }, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm text-secondary">{item.name}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              )
            )
          ) : (
            <p className="text-sm">{payload}</p>
          )}
        </div>
      )}
    </div>
  );
};

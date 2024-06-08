import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type CardButtonProps = {
  image: string;
  title: string;
  link: string;
};

export const CardButton = ({ image, title, link }: CardButtonProps): ReactElement => {
  const navigate = useNavigate();

  return (
      <div
          onClick={() => navigate(link)}
          className="flex flex-col cursor-pointer bg-white shadow-md rounded-lg overflow-hidden m-2 sm:m-4"
      >
        <div className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 w-full overflow-hidden">
          <img className="object-cover w-full h-full" src={image} alt={title} />
        </div>
        <div className="py-4 px-6 flex-grow">
          <h2 className="text-center font-bold text-xl sm:text-2xl">{title}</h2>
        </div>
      </div>
  );
};

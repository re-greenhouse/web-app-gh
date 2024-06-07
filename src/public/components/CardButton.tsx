// src/public/components/CardButton.tsx

import {ReactElement} from "react";
import {useNavigate} from "react-router-dom";

type CardButtonProps = {
  image: string;
  title: string;
  link: string;
}

export const CardButton = ({image, title, link}: CardButtonProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden m-4"
    >
      <img className="object-contain w-full h-fit" src={image} alt={title} />
      <div className="py-4 px-6">
        <h2 className="text-center font-bold text-2xl">{title}</h2>
      </div>
    </div>
  );
};
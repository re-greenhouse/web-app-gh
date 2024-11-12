import { PrimaryButton } from "@/shared/components/Buttons";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";


type MembershipCardProps = {
  membershipName: string;
  price: string;
  description: string;
  icon: string;
  suscriptionUrl: string;
};

export const MembershipCard = ({
  membershipName,
  price,
  description,
  icon,
  suscriptionUrl,
}: MembershipCardProps): ReactElement => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("https://buy.stripe.com/test_checkout");
  };

  return (
    <div className="flex flex-col bg-white border-2 rounded-lg overflow-hidden p-6 min-w-[250px] w-full h-full">
      <span className="flex justify-between align-baseline text-center mb-4">
        <span className="flex items-center gap-x-2">
          <img src={icon} alt={`${membershipName} icon`} className="w-6 h-6" />
          <h2 className="text-2xl font-bold">{membershipName}</h2>
        </span>
        <span className="flex items-baseline">
          <p className="text-xl font-bold">S/.{price}</p>
          <p className="text-sm ml-1">/mes</p>
        </span>
      </span>
      <p className="text-secondary flex-grow">{description}</p>

      <div className="mt-auto pt-4">
        <PrimaryButton size="medium" onClick={handleClick}>
          <Link to={suscriptionUrl}>Seleccionar</Link>
        </PrimaryButton>
      </div>
    </div>
  );
};

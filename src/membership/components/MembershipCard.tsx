import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook";
import { PrimaryButton } from "@/shared/components/Buttons";
import { ReactElement, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postMembership } from "../services/membership.service"
import { Membership } from "../models/Memberships";

type MembershipCardProps = {
  membershipName: string;
  levelName: string;
  price: string;
  description: string;
  icon: string;
  suscriptionUrl: string;
};

export const MembershipCard = ({
  membershipName,
  levelName,
  price,
  description,
  icon,
  suscriptionUrl,
}: MembershipCardProps): ReactElement => {
  const navigate = useNavigate();
  const { company } = useCompanyPage();

  const addOneMonth = (date: Date): string => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return result.toString();
  };

  const [data, setData] = useState<Membership | null>(null);

  useEffect(() => {
    if (company?.id) {
      setData({
        membershipLevelName: levelName,
        companyId: company.id,
        startDate: new Date().toISOString(),
        endDate: addOneMonth(new Date()),
      });
    }
  }, [company?.id, levelName]);


  const handleClick = async () => {
    if (data) {
      try {
        const response = await postMembership(data);
        if (response.status === "success") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error al registrar la membresía:", error);
      }
    }
    
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
        <PrimaryButton size="medium">
        {levelName === "basico" ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            Seleccionar (Básico)
          </a>
        ) : (
          <a
            href={suscriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            Seleccionar
          </a>
        )}
        </PrimaryButton>
      </div>
    </div>
  );
};
import { useEffect, useState } from "react";
import { CompanyService } from "@/company/services/company.service.ts";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import { Company } from "@/company/models/Company.ts";
import { Profile } from "@/auth/models/Profile.ts";

export const useCompanyPage = () => {
  const { profile, token } = useAuthStore(state => ({profile: state.profile!, token: state.token!}));
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [employees, setEmployees] = useState<Array<Profile>>([]);

  useEffect(() => {
    CompanyService.getCompanyByProfileId(profile.id, token)
      .then(response => {
        if (response.status === "success") {
          setCompany(response.payload);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    if (!company) {
      return;
    }
    CompanyService.getEmployeesByCompanyId(company.id, token)
      .then(response => {
        if (response.status === "success") {
          setEmployees(response.payload.profiles);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false))
  }, [company]);

  return {
    isLoading,
    company,
    employees
  } as const;
}
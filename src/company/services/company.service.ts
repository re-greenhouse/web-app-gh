import axios from "axios";

export class CompanyService {
  static readonly http = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
  });

  static async getCompanyByProfileId(profileId: string, token: string) {
    try {
      const response = await CompanyService.http.get('/companies', {
        headers: {
           Authorization: `Bearer ${token}`,
        },
        params: { profileId: profileId }
      });
      return {
        statusCode: 200,
        status: "success",
        payload: response.data
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 404,
          status: "error",
          message: "Parece que no estás asociado a una compañía."
        };
      }
      return {
        statusCode: 500,
        status: "error",
        message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos."
      };
    }
  }

  static async getEmployeesByCompanyId(companyId: string, token: string) {
    try {
      const response = await CompanyService.http.get(`/profiles/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        statusCode: 200,
        status: "success",
        payload: response.data
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 404,
          status: "error",
          message: error.message
        };
      }
      return {
        statusCode: 500,
        status: "error",
        message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos."
      };
    }
  }
}
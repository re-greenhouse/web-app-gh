import axios from "axios";
import {RegisterRequest} from "@/auth/interfaces/RegisterRequest.ts";
import {Profile} from "@/auth/models/Profile.ts";


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

  static async editCompany(companyId: string, companyName: string, companyTin: string, companyUrl: string, token: string){
    try {
      const response = await CompanyService.http.patch(`/companies/${companyId}`,
        {
          name: companyName,
          tin: companyTin,
          logoUrl: companyUrl
        },
        {
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

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

export const register = async (registerRequest: RegisterRequest, isAdmin: boolean, token: string): Promise<{ status: string; message: string; }> => {
  try {
    const response = await instance.post("/auth/sign-up", registerRequest);

    const profileId = response.data.profile.id;

      await instance.post("/companies/employees", 
        { 
          employeeProfileId: profileId,
          isAdmin: isAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return { status: "success", message: "Usuario registrado exitosamente." };
    }
  catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud:", error.response?.data);
      if (error.response?.status === 409) {
        return { status: "error", message: "El nombre de usuario ya existe. Por favor, ingrese otro." };
      } else if (error.response?.status === 400) {
        return { status: "error", message: `Solicitud inválida: ${error.response.data}` };
      }
    }
    return { status: "error", message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos." };
  }
};

export const login = async(username: string, password: string): Promise<
  {status: "success"; message: string; payload: { token: string; profile: Profile;}} |
  {status: "error"; message: string; }
> => {
  try {
    const response = await instance.post("/auth/sign-in", { username, password });
    return {
      status: "success",
      message: "Se ha iniciado sesión exitosamente.",
      payload: {
        token: response.data["token"],
        profile: response.data["profile"]
      }
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status == 401) {
      return {
        status: "error",
        message: "Credenciales inválidas. Revise su usuario y/o contraseña."
      };
    }
    return {
      status: "error",
      message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos."
    };
  }
}
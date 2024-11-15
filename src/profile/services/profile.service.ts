import axios from "axios";

export class ProfileService {
  static readonly http = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
  });

  static async editProfile(profileId: string, firstName: string, lastName: string, iconUrl: string, token: string){
    try {
      const response = await ProfileService.http.patch(`/profiles/${profileId}`,
        {
          firstName: firstName,
          lastName: lastName,
          iconUrl: iconUrl
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
}
import {Profile} from "@/profiles/models/Profile.ts";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});


export const getMyProfile = async(token: string): Promise<{status: string; message: string; payload?: Profile}> => {
  try {
    const response = await instance.get("/profiles/users/me",
      { headers: {Authorization: `Bearer ${token}`} }
    );
    return {
      status: "success",
      message: "Perfil recuperado con éxito.",
      payload: {
        id: response.data["id"],
        userId: response.data["userId"],
        firstName: response.data["firstName"],
        lastName: response.data["lastName"],
        iconUrl: response.data["iconUrl"],
      }
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status == 404) {
      return { status: "redirect", message: "Redirigiendo a la creación de usuario." };
    }
    return { status: "error", message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos." };
  }
}

export const createProfile = async(firstName: string, lastName: string, iconUrl: string, token: string): Promise<{status: string; message: string; payload?: Profile}> => {
  try {
    const response = await instance.post("/profiles",
      {
        firstName: firstName, lastName: lastName, iconUrl: iconUrl
      },
      { headers: {Authorization: `Bearer ${token}`} }
    );
    return {
      status: "success",
      message: "Se ha creado su perfil",
      payload: response.data
    };
  } catch (error: unknown) {
    return { status: "error", message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos." };
  }
}
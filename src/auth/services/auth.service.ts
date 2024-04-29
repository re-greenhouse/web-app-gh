import axios from "axios";
import {RegisterRequest} from "@/auth/interfaces/RegisterRequest.ts";
import {Profile} from "@/auth/models/Profile.ts";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

export const register = async(registerRequest: RegisterRequest): Promise<{status: string; message: string;}> => {
  try {
    await instance.post("/auth/sign-up", registerRequest);
    return { status: "success", message: "Se ha registrado exitosamente." };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status == 409) {
      return { status: "error", message: "El nombre de usuario ya existe. Por favor, ingrese otro." };
    }
    return { status: "error", message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos." };
  }
}

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
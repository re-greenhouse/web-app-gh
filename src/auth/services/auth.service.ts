import axios from "axios";
import {RegisterCompanyRequest, RegisterRequest} from "@/auth/interfaces/RegisterRequest.ts";
import {Profile} from "@/auth/models/Profile.ts";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

export const register = async(registerRequest: RegisterRequest, RegisterCompanyRequest: RegisterCompanyRequest): Promise<{status: string; message: string;}> => {
  try {
    await instance.post("/auth/sign-up", registerRequest);
    const loginResponse = await login(registerRequest.username, registerRequest.password);

    if (loginResponse.status !== "success") {
      return { status: "error", message: "Error al iniciar sesión después de registrar el usuario." };
    }

    const token = loginResponse.payload.token;


    await instance.post("/companies", RegisterCompanyRequest, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { status: "success", message: "Usuario y compañía registrados exitosamente." };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud:", error.response?.data);
      if (error.response?.status == 409) {
        return { status: "error", message: "El nombre de usuario ya existe. Por favor, ingrese otro." };
      } else if (error.response?.status == 400) {
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
    localStorage.setItem("token", response.data["token"]);
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
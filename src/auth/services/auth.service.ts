import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

export const register = async(username: string, password: string): Promise<{status: string; message: string;}> => {
  try {
    await instance.post("/auth/sign-up", { username, password });
    return { status: "success", message: "Se ha registrado exitosamente." };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status == 409) {
      return { status: "error", message: "El nombre de usuario ya existe. Por favor, ingrese otro." };
    }
    return { status: "error", message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos." };
  }
}

export const login = async(username: string, password: string): Promise<{status: string; message: string; token?: string;}> => {
  try {
    const response = await instance.post("/auth/sign-in", { username, password });
    return { status: "success", message: "Se ha iniciado sesión exitosamente.", token: response.data["token"] };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status == 401) {
      return { status: "error", message: "Credenciales inválidas. Revise su usuario y/o contraseña." };
    }
    return { status: "error", message: "Hubo un problema con el servidor. Intente de nuevo en unos minutos." };
  }
}
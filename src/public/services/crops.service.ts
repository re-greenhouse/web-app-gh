import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import axios from "axios";
import { Crop } from "@/public/models/Crop.ts";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
});

//Falta deleteCropById y PatchCropById
export const getCrops = async (): Promise<{ status: string; data: Crop[] | string; message?: string; }> => {
    const { token } = useAuthStore.getState();

    try {
        const response = await instance.get<Crop[]>("/crops", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Response", response.data);
        return {
            status: "success",
            data: response.data,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: "error",
                data: "There was a problem with the server. Please try again in a few minutes.",
                message: error.message
            };
        }
        return {
            status: "error",
            data: "An unexpected error occurred."
        };
    }
}
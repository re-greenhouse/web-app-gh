import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
  });

export const deleteRecordById = async (cropId: string): Promise<{ status: string }> => {
    const { token } = useAuthStore.getState();
    try {
      await instance.delete(`/crops/${cropId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { status: "success" };
    } catch (error) {
      return { status: "error" };
    }
  };
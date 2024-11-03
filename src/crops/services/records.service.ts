import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import axios from "axios";
import { Record } from "../models/Record";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export const getRecordsByCropIdAndPhase = async (
  cropId: string,
  phase: string
): Promise<{ status: string; data: Record[] | string; message?: string }> => {
  const { token } = useAuthStore.getState();

  try {
    const response = await instance.get<{ records: Record[] }>(
      `/records/${cropId}/${phase}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: "success",
      data: response.data.records,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: "error",
        data:
          "There was a problem with the server. Please try again in a few minutes.",
        message: error.message,
      };
    }
    return {
      status: "error",
      data: "An unexpected error occurred.",
    };
  }
};

export const deleteRecordById = async (recordId: string): Promise<{ status: string }> => {
  const { token } = useAuthStore.getState();
  try {
    await instance.delete(`/records/${recordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: "success" };
  } catch (error) {
    return { status: "error" };
  }
};

export const updateRecordPayload = async (
  recordId: string,
  payload: string
): Promise<{ status: string }> => {
  const { token } = useAuthStore.getState();
  try {
    await instance.patch(
      `/records/${recordId}`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "success" };
  } catch (error) {
    return { status: "error" };
  }
};

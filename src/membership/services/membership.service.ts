import axios from "axios"
import { Membership } from "../models/Memberships";
import { useAuthStore } from "@/auth/stores/useAuthStore";
import { MembershipLevel } from "../models/MembershipLevel";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export const postMembership = async (
    data: Membership
): Promise<{ status: string}> => {
    const { token } = useAuthStore.getState();
    try {
        await instance.post(
            `/memberships`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return { status: "success" };
    } catch (error) {
        return { status: "error" }
    }
}

export const getMembershipByCompnyId = async (
    companyId: string
): Promise<{status: string; data: Membership | string; message?: string}> => {
    const { token } = useAuthStore.getState();

    try {
        const response = await instance.get(
            `/memberships/${companyId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return {
            status: "success",
            data: response.data
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

export const getMembershipBenefitsByMembershipName = async (
    name: string
): Promise<{status: string; data: MembershipLevel | string; message?: string}> => {
    const { token } = useAuthStore.getState();

    try {
        const response = await instance.get(
            `/membership-levels/${name}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return {
            status: "success",
            data: response.data
        }
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
}


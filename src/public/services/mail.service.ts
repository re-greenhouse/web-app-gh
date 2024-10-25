import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
});

export const sendInviteMail = async (
    eventName: string,
    email: string,
    firstName: string,
    username: string,
    password: string
): Promise<{ status: string; message: string; }> => {
    const { token } = useAuthStore.getState();

    try {
        const response = await instance.post(
            "/mails",
            {
                eventName: eventName,
                email: email,
                payloadVariables: [
                    { variable: "firstName", value: firstName },
                    { variable: "username", value: username },
                    { variable: "password", value: password }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        console.log("Correo enviado exitosamente:", response.data);

        return {
            status: "success",
            message: "Correo de invitación enviado exitosamente."
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error en el envío del correo:", error.response.data);
            return {
                status: "error",
                message: "Hubo un problema al enviar el correo de invitación. Intente de nuevo más tarde."
            };
        }
        return {
            status: "error",
            message: "Ocurrió un error inesperado."
        };
    }
};

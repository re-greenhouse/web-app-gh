import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { register } from "../services/company.service";
import { areValidHtmlInputRefs } from "@/shared/services/ref-validation.service.ts";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";
import { sendInviteMail } from "@/public/services/mail.service";

const generateRandomPassword = (length: number = 8): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

export const useRegisterForm = () => {
  const { profile, token } = useAuthStore((state) => ({
    profile: state.profile!,
    token: state.token!,
  }));
  const usernameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    isAdmin: boolean,
    eventName: string
  ) => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([usernameRef, firstNameRef, lastNameRef, emailRef])
    ) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const toastId = toast.loading("Realizando registro de usuario.");
    setIsRegistering(true);

    const randomPassword = generateRandomPassword();

    try {
      const res = await register(
        {
          username: usernameRef.current!.value,
          password: randomPassword,
          firstName: firstNameRef.current!.value,
          lastName: lastNameRef.current!.value,
          email: emailRef.current!.value,
        },
        isAdmin,
        token
      );

      if (res.status === "success") {
        const mailRes = await sendInviteMail(
          eventName,
          emailRef.current!.value,
          firstNameRef.current!.value,
          usernameRef.current!.value,
          randomPassword
        );

        toast.update(toastId, {
          type: mailRes.status === "success" ? "success" : "error",
          render: mailRes.message,
          isLoading: false,
          autoClose: 1500,
        });
      } else {
        toast.update(toastId, {
          type: "error",
          render: res.message,
          isLoading: false,
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("Error en el registro.");
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    usernameRef,
    firstNameRef,
    lastNameRef,
    emailRef,
    isLoading: isRegistering,
    onSubmit,
  } as const;
};

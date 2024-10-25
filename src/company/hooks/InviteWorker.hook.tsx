import {FormEvent, useRef, useState} from "react";
import {toast} from "react-toastify";
import {register} from "../services/company.service";
import {areValidHtmlInputRefs} from "@/shared/services/ref-validation.service.ts";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";


export const useRegisterForm = () => {
  const { profile, token } = useAuthStore(state => ({profile: state.profile!, token: state.token!}));
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef("admin");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>, isAdmin: boolean) => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([usernameRef, firstNameRef, lastNameRef, emailRef])
    ) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const toastId = toast.loading("Realizando registro de usuario.");
    setIsRegistering(true);

    try{ 
    const res = await register({
      username: usernameRef.current!.value,
      password: passwordRef.current ?? "admin",
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
    }, isAdmin, token);

      toast.update(toastId, {
        type: res.status === "success" ? "success" : "error",
        render: res.message,
        isLoading: false,
        autoClose: 1500,
      });

    } catch (error) {
      toast.error("Error en el registro.");
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    usernameRef: usernameRef,
    passwordRef: passwordRef,
    firstNameRef: firstNameRef,
    lastNameRef: lastNameRef,
    emailRef: emailRef,
    isLoading: isRegistering,
    onSubmit: onSubmit,
  } as const;
}
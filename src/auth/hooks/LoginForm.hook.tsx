import {FormEvent, useRef, useState} from "react";
import {useAuthStore} from "@/auth/stores/useAuthStore.ts";
import {toast} from "react-toastify";
import {login} from "@/auth/services/auth.service.ts";
import {areValidHtmlInputRefs} from "@/shared/services/ref-validation.service.ts";

export const useLoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const updateLogin = useAuthStore(state => state.login);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!areValidHtmlInputRefs([usernameRef, passwordRef])) {
      toast.error("Ingrese su usuario y contraseña.");
      return;
    }

    const toastId = toast.loading("Iniciando sesión");
    setIsLogging(true);

    login(usernameRef.current!.value, passwordRef.current!.value)
      .then(res => {
        toast.update(toastId, {
          type: res.status === "success" ? "success" : "error",
          render: res.message,
          isLoading: false,
          autoClose: 1500,
        });
        setIsLogging(false);
        if (res.status === "success") {
          updateLogin(res.payload.token, res.payload.profile);
        }
      });
  }

  return {
    usernameRef: usernameRef,
    passwordRef: passwordRef,
    isLoading: isLogging,
    onSubmit: onSubmit,
  } as const;
}
import {useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {toast} from "react-toastify";
import {register} from "@/auth/services/auth.service.ts";

export const useRegisterForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !usernameRef.current || !passwordRef.current || !confirmPasswordRef.current ||
      usernameRef.current.value.length === 0 ||
      passwordRef.current.value.length === 0 ||
      confirmPasswordRef.current.value.length === 0
    ) {
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const toastId = toast.loading("Realizando registro de usuario.");
    setIsRegistering(true);

    register(usernameRef.current.value, passwordRef.current.value)
      .then(res => {
        toast.update(toastId, {
          type: res.status === "success" ? "success" : "error",
          render: res.message,
          isLoading: false,
          autoClose: 1500,
        });
        if (res.status === "success") {
          navigate("/login");
        }
      })
      .finally(() => setIsRegistering(false));
  }

  return {
    usernameRef: usernameRef,
    passwordRef: passwordRef,
    confirmPasswordRef: confirmPasswordRef,
    firstNameRef: firstNameRef,
    lastNameRef: lastNameRef,
    isLoading: isRegistering,
    onSubmit: onSubmit
  } as const;
}
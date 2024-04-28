import {FormEvent, useRef, useState} from "react";
import {useAuthStore} from "@/auth/stores/useAuthStore.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {login} from "@/auth/services/auth.service.ts";
import {getMyProfile} from "@/profiles/services/profile.service.ts";

export const useLoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const updateToken = useAuthStore(state => state.updateToken);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (
      !usernameRef.current || !passwordRef.current ||
      usernameRef.current.value.length === 0 || passwordRef.current.value.length === 0
    ) {
      toast.error("Ingrese su usuario y contraseña.");
      return;
    }

    const toastId = toast.loading("Iniciando sesión");
    setIsLogging(true);

    login(usernameRef.current.value, passwordRef.current.value)
      .then(res => {
        toast.update(toastId, {
          type: res.status === "success" ? "success" : "error",
          render: res.message,
          isLoading: false,
          autoClose: 1500,
        });
        setIsLogging(false);

        if (res.token) {
          const toastProfileId = toast.loading("Recuperando perfil");
          updateToken(res.token);
          getMyProfile(res.token)
            .then(res => {
              if (res.status === "success") {
                updateProfile(res.payload!);
              } else if (res.status === "error") {
                toast.update(toastProfileId, {
                  type: "error",
                  render: "Hubo un error al conectarse al servidor",
                  isLoading: false,
                  autoClose: 1500
                });
              } else {
                toast.update(toastProfileId, {
                  type: "info",
                  render: "Redireccionando a la creación de perfil",
                  isLoading: false,
                  autoClose: 1500
                });
                navigate("/crear-perfil");
              }
            })
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
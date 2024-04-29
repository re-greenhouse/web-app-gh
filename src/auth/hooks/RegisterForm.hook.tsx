import {useNavigate, useSearchParams} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {toast} from "react-toastify";
import {register} from "@/auth/services/auth.service.ts";
import {areValidHtmlInputRefs} from "@/shared/services/ref-validation.service.ts";

export const useRegisterForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([usernameRef, passwordRef, confirmPasswordRef, firstNameRef, lastNameRef, passwordRef])
    ) {
      return;
    }

    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const toastId = toast.loading("Realizando registro de usuario.");
    setIsRegistering(true);

    register({
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      invitationCode: searchParams.get("invitationCode"),
    })
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
    onSubmit: onSubmit,
    hasInvitation: !!searchParams.get('invitation'),
  } as const;
}
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { register, login } from "@/auth/services/auth.service.ts";
import { areValidHtmlInputRefs } from "@/shared/services/ref-validation.service.ts";
import { useAuthStore } from "@/auth/stores/useAuthStore.ts";

export const useRegisterForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const razonSocialRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const rucRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef("/images/companyImage.webp");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const updateLogin = useAuthStore((state) => state.login);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !areValidHtmlInputRefs([
        usernameRef,
        passwordRef,
        confirmPasswordRef,
        firstNameRef,
        lastNameRef,
        passwordRef,
        razonSocialRef,
        rucRef,
        emailRef,
      ])
    ) {
      return;
    }

    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const toastId = toast.loading("Realizando registro de usuario.");
    setIsRegistering(true);

    try {
      const res = await register(
        {
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
          firstName: firstNameRef.current!.value,
          lastName: lastNameRef.current!.value,
          email: emailRef.current!.value,
          invitationCode: searchParams.get("invitationCode") ?? undefined,
        },
        {
          name: razonSocialRef.current!.value,
          tin: rucRef.current!.value,
          logoUrl: imageUrlRef.current ?? "/images/companyImage.webp",
        }
      );

      toast.update(toastId, {
        type: res.status === "success" ? "success" : "error",
        render: res.message,
        isLoading: false,
        autoClose: 1500,
      });

      if (res.status === "success") {
        const loginRes = await login(
          usernameRef.current!.value,
          passwordRef.current!.value
        );

        if (loginRes.status === "success") {
          updateLogin(loginRes.payload.token, loginRes.payload.profile);
          setTimeout(() => {
            navigate("/memberships");
          }, 100);
        } else {
          toast.error(loginRes.message);
        }
      }
    } catch (error) {
      toast.error("Error en el registro.");
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    usernameRef: usernameRef,
    passwordRef: passwordRef,
    confirmPasswordRef: confirmPasswordRef,
    firstNameRef: firstNameRef,
    lastNameRef: lastNameRef,
    emailRef: emailRef,
    razonSocialRef: razonSocialRef,
    rucRef: rucRef,
    imageUrlRef: imageUrlRef,
    isLoading: isRegistering,
    onSubmit: onSubmit,
    hasInvitation: !!searchParams.get("invitation"),
  } as const;
};

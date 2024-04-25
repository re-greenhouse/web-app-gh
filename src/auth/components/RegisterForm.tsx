import {FormEvent, ReactElement, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "@/auth/services/auth.service.ts";
import {toast} from "react-toastify";
import {Spinner} from "@/shared/components/Spinner.tsx";

export const RegisterForm = (): ReactElement => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

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

  return (
    <div className="relative bg-light p-8 pt-0">
      <p className="text-2xl font-bold">¡Empiece a usar Greenhouse!</p>
      <h1 className="text-4xl font-bold text-secondary">Registrarse</h1>

      <form onSubmit={onSubmit} className="bottom-0 py-6">
        <label
          htmlFor="username"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Nombre de usuario
        </label>
        <div className="relative mb-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="text-primary w-6 h-6">
              <path fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"/>
            </svg>
          </div>
          <input
            ref={usernameRef}
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Ingrese su nombre de usuario"
          />
        </div>

        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Contraseña
        </label>
        <div className="relative mb-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="text-primary w-6 h-6">
              <path fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"/>
            </svg>
          </div>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Ingrese su contraseña"
          />
        </div>

        <label
          htmlFor="confirm-password"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Confirmar contraseña
        </label>
        <div className="relative mb-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="text-primary w-6 h-6">
              <path fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"/>
            </svg>
          </div>
          <input
            ref={confirmPasswordRef}
            type="password"
            id="confirm-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Confirme su contraseña"
          />
        </div>

        <button
          disabled={isRegistering}
          type="submit"
          className="font-semibold text-light bg-primary rounded-xl py-2 px-4 mb-6 w-full"
        >
          {
            isRegistering
              ? <Spinner color="#15F5BA" height={24} />
              : <span>Registrarse</span>
          }
        </button>

        <Link to="/login" className="text-sm text-primary font-semibold">
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </Link>
      </form>
    </div>
  );
};
import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Spinner} from "@/shared/components/Spinner.tsx";
import {ReferableTextField} from "@/shared/components/ReferableTextField.tsx";
import {useLoginForm} from "@/auth/hooks/LoginForm.hook.tsx";
import {PrimaryButton} from "@/shared/components/Buttons";

export const LoginForm = (): ReactElement => {
  const {usernameRef, passwordRef, isLoading, onSubmit} = useLoginForm();

  return (
    <div className="relative flex justify-center items-center bg-light p-8 pt-0 lg:pl-0 lg:pt-12">
      <div className="max-w-screen-sm w-full">
        <p className="text-2xl font-bold">¡Bienvenid@ a Greenhouse!</p>
        <h1 className="text-4xl font-bold text-secondary">Iniciar sesión</h1>
        <form onSubmit={onSubmit} className="bottom-0 py-6">
          <ReferableTextField
            id="username"
            type="text"
            ref={usernameRef}
            label="Nombre de usuario"
            placeholder="Ingrese su nombre de usuario"
            TrailingIcon={
              <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   fill="currentColor">
                <path fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"/>
              </svg>
            }
          />
          <ReferableTextField
            id="password"
            type="password"
            ref={passwordRef}
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            TrailingIcon={
              <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   fill="currentColor">
                <path fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                      clipRule="evenodd"/>
              </svg>
            }
          />
          <PrimaryButton disabled={isLoading} type="submit">
            {
              isLoading
                ? <Spinner color="#15F5BA" height={24}/>
                : <span>Iniciar sesión</span>
            }
          </PrimaryButton>
          <Link to="/register" className="block text-sm text-primary font-semibold mt-6">
            ¿Todavía no tienes una cuenta? Regístrate aquí
          </Link>
        </form>
      </div>
    </div>
  );
};
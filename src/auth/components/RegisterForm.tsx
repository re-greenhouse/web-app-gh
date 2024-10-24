import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Spinner} from "@/shared/components/Spinner.tsx";
import {ReferableTextField} from "@/shared/components/ReferableTextField.tsx";
import {useRegisterForm} from "@/auth/hooks/RegisterForm.hook.tsx";
import {InfoMessage} from "@/shared/components/Messages";
import {PrimaryButton} from "@/shared/components/Buttons";

export const RegisterForm = (): ReactElement => {
  //Dejo listo la interfaz, falta mandar la razon social y el ruc a donde deba ir
  const {usernameRef, passwordRef, confirmPasswordRef, firstNameRef, lastNameRef, emailRef, razonSocialRef, rucRef, hasInvitation, isLoading, onSubmit} = useRegisterForm();

  return (
    <div className="relative flex justify-center items-center bg-background p-8 pt-0 lg:pl-0 lg:pt-12">
      <div className="max-w-screen-sm w-full">
        <p className="text-2xl">¡Empiece a usar Greenhouse!</p>
        <h1 className="text-4xl text-primary mb-3">Registrarse</h1>

        {
          hasInvitation
            ? <InfoMessage text="Se ha aplicado un código de invitación." />
            : null
        }

        <form onSubmit={onSubmit} className="bottom-0 py-2">
        <div className="pb-4">
          <h1>Información del cliente</h1>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div>
              <ReferableTextField
                id="first-name"
                ref={firstNameRef}
                label="Nombre"
                placeholder="Ingrese su nombre"
                type="text"
              />
            </div>
            <div>
              <ReferableTextField
                id="last-name"
                ref={lastNameRef}
                label="Apellido"
                placeholder="Ingrese su apellido"
                type="text"
              />
            </div>
          </div>
          <ReferableTextField
                id="correo"
                ref={emailRef}
                label="Correo electronico de cliente"
                placeholder="Ingrese su correo"
                type="mail"
              />
          <div className="pb-4">
          <h1>Información de la empresa</h1>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div>
              <ReferableTextField
                id="razon-social"
                ref={razonSocialRef}
                label="Razón Social"
                placeholder="Ingrese la razón social"
                type="text"
              />
            </div>
            <div>
              <ReferableTextField
                id="ruc"
                ref={rucRef}
                label="RUC"
                placeholder="Ingrese el RUC"
                type="text"
              />
            </div>
          </div>
          <ReferableTextField
            id="username"
            ref={usernameRef}
            label="Nombre de usuario"
            placeholder="Ingrese su nombre de usuario"
            type="text"
            TrailingIcon={
              <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd"/>
              </svg>
            }
          />
          <ReferableTextField
            id="password"
            ref={passwordRef}
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            type="password"
            TrailingIcon={
              <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd"/>
              </svg>
            }
          />
          <ReferableTextField
            id="confirm-password"
            ref={confirmPasswordRef}
            label="Confirmar contraseña"
            placeholder="Confirme su contraseña"
            type="password"
            TrailingIcon={
              <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd"/>
              </svg>
            }
          />
          <PrimaryButton disabled={isLoading} type="submit">
            {
              isLoading
                ? <Spinner color="#15F5BA" height={24}/>
                : <span>Registrarse</span>
            }
          </PrimaryButton>
          <Link to="/login" className="block text-sm text-secondary font-semibold mt-6">
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Link>
        </form>
      </div>
    </div>
  );
};
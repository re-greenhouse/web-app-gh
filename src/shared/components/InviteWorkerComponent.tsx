import { ReactElement, useState, useEffect } from "react";
import { PrimaryButton } from "./Buttons";



export const InviteComponent= ({hideDialog}: {hideDialog: ()=> void}): ReactElement => {

    return (
        <div>
            <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex w-full justify-center h-screen z-20 content-center items-center">
                <div className="bg-background w-1/3 h-2/3 content-start justify-center text-center rounded-2xl">
                    <div className="flex flex-col justify-center w-full p-5">
                        <span className="flex justify-center w-full">
                            <h1 className="mx-auto py-5 text-inviteCompontentText font-semibold text-xl">
                                Invitar a trabajador
                            </h1>
                            <span>
                                <button
                                    onClick={hideDialog}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        </span>
                        <div className="text-start w-full">
                            <h1 className="py-5 text-inviteCompontentText font-semibold text-lg">
                                Información del trabajador
                            </h1>
                            <div className="flex justify-between gap-3">
                                <div className="flex flex-col w-full">
                                    <h1>Nombre</h1>
                                    <input type="text" placeholder="Ingrese el nombre" className="border-2 border-gray-300 rounded-md w-full p-2 mt-2" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h1>Apellido</h1>
                                    <input type="text" placeholder="Ingrese el apellido" className="border-2 border-gray-300 rounded-md w-full p-2 mt-2" />
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 py-5">
                                <div className="flex flex-col w-full">
                                    <h1>Nombre usuario</h1>
                                    <input type="text" placeholder="Ingrese el nombre de usuario" className="border-2 border-gray-300 rounded-md w-full p-2 mt-2" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h1>Apellido</h1>
                                    <select className="border-2 border-gray-300 rounded-md w-full p-2 mt-2">
                                        <option value="Tecnico">Técnico supervisor</option>
                                        <option value="Admin">Administrador</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <h1>Correo</h1>
                                <input type="mail" placeholder="Ingrese el correo electronico para invitar al trabajador" className="border-2 border-gray-300 rounded-md w-full p-2 mt-2" />
                            </div>
                            <div className="flex flex-col p-10 gap-8 w-full">
                                <PrimaryButton disabled={false} type="submit" label="Enviar invitación por correo" onClick={hideDialog} variant="primary"/>
                                <PrimaryButton disabled={false} type="submit" label="Cancelar" onClick={hideDialog} variant="secondary"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { ReactElement } from "react";
import { PrimaryButton } from "./Buttons";

type DeleteDialogProps = {
    hideDialog: () => void,
    userData: {
        firstName: string,
        lastName: string
    }
}

export const DeleteDialog= ({ hideDialog, userData }: DeleteDialogProps): ReactElement => {

    return (
        <div>
            <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex w-full justify-center h-screen z-20 content-center items-center">
                <div className="bg-background content-start justify-center text-center rounded-2xl">
                    <div className="flex flex-col justify-center w-full p-5">
                        <span className="flex justify-center w-full">
                            <h1 className="mx-auto py-5 text-inviteCompontentText font-semibold text-xl">
                                ¿Estás seguro de que deseas eliminar a {userData.firstName} {userData.lastName}?
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
                        <div className="text-center w-full">
                            <h1>Esta acción es permanente</h1>
                            <div className="flex flex-col p-5 gap-2 w-full">
                                <PrimaryButton disabled={false} type="submit" label="Eliminar Trabajador" onClick={hideDialog} variant="primary"/>
                                <PrimaryButton disabled={false} type="submit" label="Cancelar" onClick={hideDialog} variant="secondary"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
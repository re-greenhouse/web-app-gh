import { ReactElement } from "react";
import { PrimaryButton } from "./Buttons";

type DeleteDialogProps = {
  hideDialog: () => void;
  text: string;
  loading: boolean;
  error: string | null;
  confirmDelete: () => Promise<void>;
};

export const DeleteDialog = ({
  hideDialog,
  text,
  loading,
  error,
  confirmDelete,
}: DeleteDialogProps): ReactElement => {
  return (
    <div>
      <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex w-full justify-center h-screen z-50 content-center items-center">
        <div className="bg-background content-start justify-center text-center rounded-2xl p-5">
          <div className="flex flex-col justify-center w-full">
            <span className="flex justify-center w-full">
              <h1 className="mx-auto py-5 text-inviteCompontentText font-semibold text-xl">
                {text}
              </h1>
              <span>
                <button onClick={hideDialog}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </span>
            <div className="text-center w-full">
              <h1>Esta acción es permanente</h1>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-col p-5 gap-2 w-full">
                <PrimaryButton
                  disabled={loading}
                  type="button"
                  label={loading ? "Eliminando..." : "Eliminar"}
                  onClick={confirmDelete}
                  variant="primary"
                />
                <PrimaryButton
                  disabled={loading}
                  type="button"
                  label="Cancelar"
                  onClick={hideDialog}
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

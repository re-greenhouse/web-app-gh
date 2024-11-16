import ReactDOM from "react-dom";
import { ReactElement, MouseEvent } from "react";
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
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      hideDialog();
    }
  };

  const dialog = (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-2xl p-5 w-full max-w-md mx-auto shadow-lg relative">
        <div className="flex flex-col justify-center text-center">
          <span className="flex justify-center items-center w-full">
            <h1 className="mx-auto py-5 text-inviteCompontentText font-semibold text-xl">
              {text}
            </h1>
          </span>

          <div className="text-center w-full">
            <h1>Esta acción es permanente</h1>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex flex-col p-5 gap-2 w-full">
              <PrimaryButton
                disabled={loading}
                type="button"
                label={loading ? "Eliminando..." : "Eliminar"}
                onClick={confirmDelete}
                variant="primary"
              />
              <button
                onClick={hideDialog}
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, document.body);
};

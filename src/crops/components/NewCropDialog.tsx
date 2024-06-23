import { PrimaryButton } from "@/shared/components/Buttons";
import { ReactElement } from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const NewCropDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDialogProps): ReactElement | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Iniciar nuevo cultivo</h2>
        <p className="mb-4">¿Estás seguro de iniciar un nuevo cultivo?</p>
        <div className="flex justify-end space-x-4">
            <PrimaryButton label="Cancelar" size="small" variant="secondary" onClick={onClose} />
            <PrimaryButton label="Confirmar" size="small" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

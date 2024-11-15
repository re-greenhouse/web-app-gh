import { ReactElement, useState } from "react";
import { Dropdown } from "@/shared/components/DropDownComponent";
import {
  deleteRecordById,
  updateRecordPayload,
} from "../services/records.service";
import { PrimaryButton } from "@/shared/components/Buttons";
import { DeleteDialog } from "@/shared/components/DeleteDialog";

type RecordCardProps = {
  recordId: string;
  updatedDate: string;
  author: string;
  payload: string;
};

export const RecordCard = ({
  recordId,
  updatedDate,
  author,
  payload,
}: RecordCardProps): ReactElement => {
  const [showDetails, setShowDetails] = useState(false);
  const [toggleText, setToggleText] = useState("Mostrar detalles");
  const [showDropdown, setShowDropdown] = useState(false);
  const [editingPayload, setEditingPayload] = useState(false);
  const [newPayload, setNewPayload] = useState(payload);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let parsedPayload;
  try {
    parsedPayload = JSON.parse(payload);
  } catch (e) {
    parsedPayload = payload;
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setToggleText(showDetails ? "Mostrar detalles" : "Ocultar detalles");
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError(null);

    const response = await deleteRecordById(recordId);
    setLoading(false);

    if (response.status === "success") {
      setShowDialog(false);
      window.location.reload();
    } else {
      setError("Error al eliminar el registro.");
    }
  };

  const handleEditPayload = async () => {
    setLoading(true);
    const response = await updateRecordPayload(recordId, newPayload);
    setLoading(false);

    if (response.status === "success") {
      alert("Payload actualizado exitosamente");
      setEditingPayload(false);
    } else {
      alert("Error al actualizar el payload");
    }
  };

  return (
    <div className="flex flex-col bg-white border rounded-lg overflow-visible p-4 shadow md:min-w-[760px]">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">Registro # {recordId}</h4>
        <div className="relative">
          <button
            className="p-1"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src="/icons/dots.svg" alt="more options" className="w-5 h-5" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 z-50 bg-white shadow-lg rounded-lg">
              <Dropdown
                options={["Editar payload", "Eliminar registro"]}
                onOptionSelect={(option) => {
                  if (option === "Eliminar registro") {
                    setShowDialog(true);
                  } else if (option === "Editar payload") {
                    setEditingPayload(true);
                  }
                  setShowDropdown(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between my-2">
        <span className="flex">
          <img
            src="https://publicdomainvectors.org/tn_img/abstract-user-flat-4.webp"
            alt="user icon"
            className="w-6 h-6 mr-2"
          />
          <p className="text-sm font-medium">
            <b>Autor:</b> {author}
          </p>
        </span>

        <span className="flex">
          <img
            src="/icons/calendar.svg"
            alt="calendar icon"
            className="w-6 h-6 mr-2"
          />
          <p className="text-sm text-secondary">{updatedDate}</p>
        </span>
        <button
          onClick={toggleDetails}
          className="text-sm text-secondary underline cursor-pointer"
        >
          {toggleText}
        </button>
      </div>

      {showDetails && !editingPayload && (
        <div>
          <hr className="my-2 border-t border-gray-300" />
          {parsedPayload?.data ? (
            parsedPayload.data.map(
              (item: { name: string; value: string }, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm text-secondary">{item.name}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              )
            )
          ) : (
            <p className="text-sm">{payload}</p>
          )}
        </div>
      )}

      {editingPayload && (
        <div className="flex flex-col gap-2">
          <textarea
            value={newPayload}
            onChange={(e) => setNewPayload(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <div className="flex justify-end gap-2">
            <PrimaryButton
              size="small"
              variant="secondary"
              onClick={() => setEditingPayload(false)}
            >
              <span>Cancelar</span>
            </PrimaryButton>
            <PrimaryButton size="small" onClick={handleEditPayload}>
              <span>Guardar</span>
            </PrimaryButton>
          </div>
        </div>
      )}

      {showDialog && (
        <DeleteDialog
          hideDialog={() => setShowDialog(false)}
          text={`¿Estás seguro de que deseas eliminar el registro ${recordId}?`}
          confirmDelete={confirmDelete}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

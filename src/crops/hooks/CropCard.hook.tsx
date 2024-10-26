import { useState } from "react";
import { deleteRecordById } from "../services/crop.service";

interface UseDeleteCropReturn {
  handleDeleteCrop: (cropId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useDeleteCrop = (): UseDeleteCropReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteCrop = async (cropId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false); // Reiniciar el estado de éxito antes de la eliminación

    try {
      await deleteRecordById(cropId);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error eliminando el cultivo.");
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteCrop, loading, error, success };
};

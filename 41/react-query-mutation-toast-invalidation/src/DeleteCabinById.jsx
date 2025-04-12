import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinById } from "./apiCabins";
import { toast } from "react-hot-toast";

export default function DeleteCabinById({ id }) {
    const queryClient = useQueryClient();
  const {
    mutate: deleteCabin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteCabinById,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      // Optionally, you can invalidate queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      toast.error(`Error deleting cabin: ${error.message}`);
    },
  });

  return (
    <div>
      <button onClick={() => deleteCabin(id)} disabled={isLoading}>
        Delete Cabin
      </button>
      {isLoading && <p>Deleting...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

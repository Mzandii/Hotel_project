import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCabin } from "../../services/apiCabins";

export default function useDeleteCabinHook() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabinMutation, isPending: isDeleting } = useMutation({
    mutationFn: ({ id }: { id: number | string }) => deleteCabin({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("DELETED SUCCESSFULLY!", {
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      console.error("Failed to delete cabin:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { deleteCabinMutation, isDeleting };
}

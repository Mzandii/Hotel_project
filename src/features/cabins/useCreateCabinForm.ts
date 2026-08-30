import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabinHook() {
  const queryClient = useQueryClient();

  const { mutate: submitCabin, isPending: isLoading } = useMutation({
    mutationFn: ({ id, data }: { id?: number; data: FormData }) =>
      createEditCabin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("CABIN CREATED SUCCESSFULLY!", { position: "top-right" });
    },
    onError: (error: Error) => {
      console.error("FAILED TO SAVE CABIN:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { submitCabin, isLoading };
}

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCustomMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  queryKeys: string[],
  options?: {
    successMessage?: string | ((data: TData) => string);
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
  },
) {
  const queryClient = useQueryClient();
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys });
      const message =
        typeof options?.successMessage === "function"
          ? options.successMessage(data)
          : options?.successMessage || "Operation successful!";
      toast.success(message, { position: "top-right" });
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      console.error("Mutation failed:", error);
      toast.error(`Error: ${error.message}`);
      options?.onError?.(error, variables);
    },
  });
}

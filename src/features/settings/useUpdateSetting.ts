import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { toast } from "react-toastify";

export default function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("seeting updates");
    },
    onError: (error) => {
      console.log(error);
      toast.error("could not change the setting");
    },
  });

  return { mutate, isPending };
}

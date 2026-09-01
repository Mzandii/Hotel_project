import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSetting() {
  const result = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  const { data, isLoading, error } = result;
  return { data, isLoading, error };
}

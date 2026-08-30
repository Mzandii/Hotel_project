import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: cabins,
    isPending: isLoading,
    error,
  } = useQuery({
    queryFn: getCabins,
    queryKey: ["cabins"],
  });

  return {
    cabins,
    isLoading,
    error,
    isError: !!error,
  };
}

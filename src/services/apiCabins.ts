import { supabase } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be laoded");
  }
  return data;
}

export async function deleteCabin({ id }: { id: number | string }) {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  const { error, data } = await supabase
    .from("cabins")
    .delete()
    .eq("id", numericId);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

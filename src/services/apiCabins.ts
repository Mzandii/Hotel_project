import { supabase } from "./supabase";
import type { FormData } from "../features/cabins/CreateCabinForm";
import type { ChangeEvent } from "react";

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

export async function createCabin(newCanin: FormData) {
  try {
    const { data: createCabinData, error } = await supabase
      .from("cabins")
      .insert([newCanin])
      .select();
    if (error) {
      console.error("Supabase error:", error.message);
      return;
    }
    console.log("Inserted cabin:", createCabinData);
    return createCabinData;
  } catch (error) {
    console.error("cabin could not be created!", error);
  }
}

export async function uploadCabinImage(file: File): Promise<string | null> {
  const filePath = `${file.name}-${Date.now()}`;
  const { error } = await supabase.storage
    .from("cabin-images")
    .upload(filePath, file);
  if (error) {
    console.error("Upload Error:", error.message);
    return null;
  }
  const { data } = supabase.storage.from("cabin-images").getPublicUrl(filePath);
  return data.publicUrl;
}

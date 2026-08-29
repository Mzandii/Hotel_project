import { supabase } from "./supabase";
import type { FormData } from "../features/cabins/CreateCabinForm";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
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

export async function createEditCabin(
  id: number | undefined,
  cabinDatafromForm: FormData,
) {
  const newFile =
    cabinDatafromForm.image instanceof FileList
      ? cabinDatafromForm.image.item(0)
      : undefined;

  const currentImageUrl =
    typeof cabinDatafromForm.image === "string"
      ? cabinDatafromForm.image
      : undefined;

  // Priority: new file > existing image > error
  if (!newFile && !currentImageUrl) {
    throw new Error("There is no image uploaded");
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const imageName = newFile
    ? `${Math.random()}-${newFile.name}`.replaceAll("/", "")
    : undefined;

  const imagePath = newFile
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : currentImageUrl!;

  try {
    let query = supabase.from("cabins");

    if (!id) {
      query = query.insert([{ ...cabinDatafromForm, image: imagePath }]);
    } else {
      query = query
        .update({ ...cabinDatafromForm, image: imagePath })
        .eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
      console.error("Supabase error:", error.message);
      throw new Error("Cabin could not be created/updated");
    }

    // Only upload if a new file was actually selected
    if (newFile) {
      const { error: uploadError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName!, newFile);

      if (uploadError) {
        console.error(
          "Upload error, cabin will be deleted:",
          uploadError.message,
        );
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error(
          "Cabin image could not be uploaded, cabin was not created",
        );
      }
    }

    return data;
  } catch (error) {
    console.error("Cabin could not be created!", error);
    throw error;
  }
}

import { supabase } from "./supabase";
import type { FormData } from "../features/cabins/CreateCabinForm";

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

export async function uploadCabinImage(data: any): Promise<string | undefined> {
  try {
    const file = data.image instanceof FileList ? data.image[0] : data.image;
    if (!file || !(file instanceof File)) {
      console.error("No valid file selected");
      return;
    }
    const filePath = `${file.name}-${Date.now()}`;
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload Error:", uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in onSubmit:", error);
  }
}

export async function createCabinCabinUrlThenImage(
  cabinDatafromForm: FormData,
) {
  const file =
    cabinDatafromForm.image instanceof FileList
      ? cabinDatafromForm.image.item(0)
      : undefined;

  if (!file) {
    throw new Error("There is no image uploaded");
  }

  const imagePath = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imagePath}`;

  try {
    const { data: createCabinData, error } = await supabase
      .from("cabins")
      .insert([{ ...cabinDatafromForm, image: publicUrl }])
      .select();

    if (error) {
      console.error("Supabase error:", error.message);
      return;
    }

    console.log("Inserted cabin:", createCabinData);

    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imagePath, file);

    if (uploadError) {
      console.error(
        "Upload Error:Thecabin will be deleted",
        uploadError.message,
      );
      await supabase.from("cabins").delete().eq("id", createCabinData[0].id);
      return;
    }

    console.log("Image also inserted:");
    return createCabinData;
  } catch (error) {
    console.error("cabin could not be created!", error);
  }
}

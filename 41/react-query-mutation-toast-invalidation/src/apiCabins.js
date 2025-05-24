import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export const getCabinById = async (id) => {
  const { data, error } = await supabase.from("cabins").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data;
}

export const deleteCabinById = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}


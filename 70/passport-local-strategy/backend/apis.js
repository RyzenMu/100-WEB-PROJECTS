import supabase from "./supabase";

async function pushAuthData(username, password) {
  const { data, error } = await supabase
    .from("passport-local-strategy-username-password")
    .insert([{ username: username, password: password }])
    .select();

  if (error) throw new Error("api function error ", error.message);

  console.log("Registered successfully", data);
}

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertSignupData(username, email, password, confirm) {
  const { data, error } = await supabase
    .from("MS Forms")
    .insert([
      {
        username: username,
        email: email,
        password: password,
        confirm,
        confirm,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  console.log("user data successfully updated");
}

export { insertSignupData, supabase };

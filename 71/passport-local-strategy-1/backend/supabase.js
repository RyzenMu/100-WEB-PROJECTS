import dotenv from 'dotenv'
dotenv.config()
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getUsers() {
let { data: users, error } = await supabase
  .from('passport-local-strategy-username-password')
  .select('*')
 
 if (error) throw new Error(error.message) 
 
 return users; 
}

export default getUsers;


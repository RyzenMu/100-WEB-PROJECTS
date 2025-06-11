import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

async function insertData(newData) {
  console.log("invoked supase insert function");

  const { data, error } = await supabase
    .from('Artificial Intelligence Roadmap')
    .insert([
      { id: newData.id, title: newData.title, completed: newData.completed },
    ])
    .select()

}

async function getData(){

  let { data: supabaseConcepts, error } = await supabase
    .from('Artificial Intelligence Roadmap')
    .select('*')
  if (error) throw new Error(error.message)  
    return supabaseConcepts
}

export { insertData, getData };



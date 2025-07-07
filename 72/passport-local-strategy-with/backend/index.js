import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let users = [];
async function getUsersData() {
  let { data: fetchedData, error } = await supabase
    .from("passport-local-strategy-username-password")
    .select("*");
  if (error) throw new Error(error.message)  
  return fetchedData;
}
(async ()=> {
    users = await getUsersData()
    console.log(users)
})()
console.log(users);

import express from 'express';
import { fileURLToPath } from "url";
const app = express();
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
const PORT = 3000;
app.use(express.json())

app.get('/login', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.post('/login', (req, res) => {
    console.log(req.body.username)
    console.log(req.body.password)
    res.send('login received')
})

app.listen(3000, ()=>console.log('server started on port 3000'))


import express, { urlencoded } from "express";
import cors from "cors";
import { insertSignupData } from "./supabase.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

//passport
import passport from "passport";
import session from "express-session";
import pkg from "passport-local";
import { supabase } from "./supabase.js";

const LocalStrategy = pkg.Strategy;

let users = [];

app.use(
  session({
    secret: "bunny failure",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

async function getUsers() {
  let { data: users1, error } = await supabase.from("MS Forms").select("*");
  if (error) throw new Error(error);
  users = users1
}
await getUsers()


//local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if(!user) return done(null, false, {message: 'incorrect user name'})
    if(user.password !== password)  return done(null, false, {message: 'Incorrect password'})
    return done(null, user)  
  })
);

// serialize and de-seralize user
passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=>{
  const user = users.find(u => u.id === id);
  done(null, user)
})


app.post("/signup", (req, res) => {
  const { username, email, password, confirm } = req.body;
  console.log(username, email, password, confirm);
  insertSignupData(username, email, password, confirm);
});

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (passport.authenticate) res.render("survey.ejs");
// });

app.post('/login', passport.authenticate('local', {
  successRedirect: '/survey',
  failureRedirect:'http://localhost:5173/login'
}))

app.get('/survey', (req, res)=> {
  if (req.isAuthenticated()) res.render('survey.ejs')
  else res.redirect('http://localhost:5173/login')  
})


app.listen(3000, () => console.log("server started"));

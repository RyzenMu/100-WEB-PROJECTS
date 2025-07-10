// supabase
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import session from "express-session";

// get users
let users = [];
let themes = [];

async function getUsers() {
  let { data: usersFromSupabase, error } = await supabase
    .from("passport-local-strategy-username-password")
    .select("*");
  if (error) throw new Error(error.message);
  return usersFromSupabase;
}

// get themes
async function getThemes() {
  let { data: themes, error } = await supabase
    .from("darkThemeProvider")
    .select("*");
  if (error) throw new Error(error.message);
  return themes;
}
users = await getUsers();
themes = await getThemes();
console.log(`users`, users);
console.log("themes", themes);

// middleware
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = users.find((u) => u.username === username);
      if (!user) return done(null, false, { message: "user not found" });
      if (user.password !== password) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// express apis

import express from "express";
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done)=> {
  const user = users.find(u => u.id === id);
  done(null, user)
})

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    return res.redirect("http://localhost:5173/protected");
  }
);

app.get("/login", function (req, res) {
  res.send(`
    <h1>Login</h1>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required />
      <br><br>
      <input type="password" name="password" placeholder="Password" required />
      <br><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.listen(3000, () => console.log("server started at 3000"));

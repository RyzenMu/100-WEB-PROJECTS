import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import path from "path";
import pkg from "passport-local";
const LocalStrategy = pkg.Strategy;

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
let users = [];
(async () => {
  let { data: users1, error } = await supabase
    .from("passport-local-strategy-username-password")
    .select("*");
  if (error) {
    console.error("Error fetching data:", error.message);
  } else {
    console.log("Fetched data:", users1);
    users = users1;
  }
})();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// passport
import passport from "passport";
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = users.find((u) => u.username === username);
      if (!user) return done(null, false, { message: "users not found" });
      if (user.password !== password)
        return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  const user = users.find((u) => u.username === username);
  done(null, user);
});

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret_key-1",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/hello", (req, res) => {
  res.send("Hi this mssage isfron 3000 server");
});

app.get("/api/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.redirect("http://localhost:5173/protected");
});

app.post("/api/userLogin", (req, res, next) => {
  const { username, password } = req.body;
  passport.authenticate("local", (err, user) => {
    if (err || !user) return res.redirect("/api/login");
    req.logIn(user, ( err) => {
      if (err) req.redirect("/api/login");
      return res.redirect("http://localhost:5173/final");
    });
  })(req, res, next);
});

app.listen(3000, () => console.log("server started"));

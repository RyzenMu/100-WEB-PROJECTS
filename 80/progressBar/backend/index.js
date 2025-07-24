// server.js
import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Config
dotenv.config();
const app = express();
const PORT = 5000;

// Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Attempt login with:", username);

    const { data: userData, error } = await supabase
      .from("bankUsers")
      .select("*")
      .eq("email", username)
      .single();

    if (error || !userData) {
      console.log("User not found");
      return done(null, false, { message: "User not found" });
    }

    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      console.log("Wrong password");
      return done(null, false, { message: "Incorrect password" });
    }

    console.log("Login success:", userData.email);
    return done(null, userData);
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { data, error } = await supabase.from("bankUsers").select("*").eq("id", id).single();
  done(error, data);
});

// Routes
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const { data, error } = await supabase.from("bankUsers").insert([{ name, email, password: hashedPassword }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "User registered successfully", data });
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

app.get("/api/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.listen(PORT, () => console.log(`Server  23/7/25 running on http://localhost:${PORT}`));

// server.js
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // 👈 use email as the username field
      passwordField: "password",
    },
    async (email, password, done) => {
      const { data, error } = await supabase
        .from("bloggis")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) return done(null, false, { message: "User not found" });
      if (data.password !== password) return done(null, false, { message: "Incorrect password" });

      return done(null, data);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { data } = await supabase.from("bloggis").select("*").eq("id", id).single();
  done(null, data);
});

// Register route
app.post("/register", async (req, res) => {
  const { name, dob, gender, email, password } = req.body;

  const { data, error } = await supabase.from("bloggis").insert([
    { name, dob, gender, email, password },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Registered successfully" });
});

//login route
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    if (!user) return res.status(400).json({ message: info.message || "Login failed" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});


// Logout route
app.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Logged out" });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

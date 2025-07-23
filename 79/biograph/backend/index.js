import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: "biograph-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const { data: users, error } = await supabase
        .from("bioUsers")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !users)
        return done(null, false, { message: "Invalid email" });

      const isValid = await bcrypt.compare(password, users.password);
      if (!isValid) return done(null, false, { message: "Invalid password" });

      return done(null, users);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const { data: user, error } = await supabase
    .from("bioUsers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return done(error, null);
  done(null, user);
});

app.post("/register", async (req, res) => {
  const { name, email, password, confirm } = req.body;

  if (!name || !email || !password || password !== confirm)
    return res.status(400).json({ error: "Invalid input" });

  const hashed = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("bioUsers")
    .insert([{ name, email, password: hashed }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, user: data[0] });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user)
      return res.status(401).json({ success: false, message: info.message });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ success: true });
  });
});

// Check if user is authenticated
app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
